import { Unit, Currency } from './units.model';

export interface Ingredient {
  id: string;
  name: string;
  categories: string[];
  shops: string[];
  units: Unit;
  description: string;
  photo: string;
  stock: number;
  ordered: number;
  min_stock: number;
  price: number;
  price_unit: Currency;
  createdAt: Date;
  updatedAt: Date;
}
