import { Product } from './product';
import { ProductCategory } from './product-category';

export interface GetResponse {
  _embedded: {
    products: Product[];
    productCategory: ProductCategory[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
