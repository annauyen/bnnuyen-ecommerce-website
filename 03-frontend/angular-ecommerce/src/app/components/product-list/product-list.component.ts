import { Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ProductComponent } from './product/product.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatSlideToggleModule, MatButtonModule, ProductComponent, NgFor],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  private productService = inject(ProductService);
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
