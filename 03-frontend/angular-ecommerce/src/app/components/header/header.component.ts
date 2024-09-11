import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductCategory } from '../../models/product-category';
import { ProductService } from '../../services/product.service';
import { NgFor } from '@angular/common';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    MatIcon,
    RouterLink,
    RouterLinkActive,
    NgFor,
    SearchComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  productCategories = [] as ProductCategory[];
  productService = inject(ProductService);
  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
    this.productService
      .getProductCategories()
      .subscribe((productCategories) => {
        this.productCategories = productCategories.map(
          (category: ProductCategory) => {
            return {
              ...category,
              categoryName: this.toSentenceCase(category.categoryName),
            };
          }
        );
        console.log(this.productCategories);
      });
  }
  toSentenceCase(str: string): string {
    if (!str) return str;
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
