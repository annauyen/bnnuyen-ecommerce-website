import { Product } from './product';

export interface ProductCategory {
  id: number;
  categoryName: string;
  products: Product[];
}
