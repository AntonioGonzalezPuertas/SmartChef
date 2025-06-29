import { Unit, Currency } from './units.model';

export interface Ingridient {
  id: string;
  title: string;
  categories: string[];
  shops: string[];
  units: Unit;
  description: string;
  photo: string;
  price: number;
  price_unit: Currency;
  createdAt: Date;
  updatedAt: Date;
}
