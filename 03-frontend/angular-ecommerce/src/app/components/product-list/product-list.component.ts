import { Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ProductComponent } from './product/product.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatButtonModule,
    ProductComponent,
    NgFor,
    NgIf,
    MatPaginatorModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId = 1;
  previousCategoryId = 1;
  searchMode = false;

  pageNumber = 1;
  pageSize = 10;
  totalElements = 0;

  private productService = inject(ProductService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getListProducts();
    });
  }
  getListProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(keyword).subscribe((data) => {
      this.products = data;
    });
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService
      .getProductsPaginate(
        this.pageNumber - 1,
        this.pageSize,
        this.currentCategoryId
      )
      .subscribe((data) => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      });
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.handleListProducts();
  }
}
