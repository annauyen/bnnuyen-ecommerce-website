import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgModel } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatIcon],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(productId).subscribe((data) => {
      this.product = data;
    });
  }

  quantity: number = 0;

  increment() {
    this.quantity++;
  }
}
