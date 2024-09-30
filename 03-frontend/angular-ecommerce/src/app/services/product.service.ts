import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';
import { GetProductsResponse } from '../models/get-products-response';
import { GetCategoryResponse } from '../models/get-category-response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl + '/products';
  private categoryUrl = environment.apiUrl + '/product-category';
  constructor(private http: HttpClient) {}

  getProducts(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.apiUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getProductsFromResponse(searchUrl);
  }

  getProductsPaginate(
    page: number,
    pageSize: number,
    categoryId: number
  ): Observable<GetProductsResponse> {
    const searchUrl =
      `${this.apiUrl}/search/findByCategoryId?id=${categoryId}` +
      `&page=${page}&size=${pageSize}`;
    console.log(searchUrl);

    return this.http.get<GetProductsResponse>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http
      .get<GetCategoryResponse>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  getProductById(id: number): Observable<Product> {
    const productUrl = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(productUrl);
  }

  searchProducts(
    page: number,
    pageSize: number,
    keyword: string
  ): Observable<GetProductsResponse> {
    const searchUrl =
      `${this.apiUrl}/search/findByNameContaining?name=${keyword}` +
      `&page=${page}&size=${pageSize}`;

    console.log(searchUrl);

    return this.http.get<GetProductsResponse>(searchUrl);
  }

  private getProductsFromResponse(searchUrl: string): Observable<Product[]> {
    return this.http
      .get<GetProductsResponse>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}
