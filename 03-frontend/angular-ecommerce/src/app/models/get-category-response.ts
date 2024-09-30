import { ProductCategory } from './product-category';

export interface GetCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
