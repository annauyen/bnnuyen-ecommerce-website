import { Product } from './product';

export interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
