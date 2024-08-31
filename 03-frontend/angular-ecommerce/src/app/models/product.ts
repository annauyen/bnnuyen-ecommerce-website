import { ProductCategory } from './product-category';

export interface Product {
  id: number;
  category: ProductCategory;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  active: boolean;
  unitsInStock: number;
  dateCreated: Date;
  lastUpdated: Date;
}
