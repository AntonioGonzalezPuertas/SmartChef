import { Recipe } from './recipe.model';

export interface Schedule {
  id?: string;
  date: Date;
  recipes: string[];
  period: string; // 'lunch' | 'dinner'
  createdAt?: Date;
  updatedAt?: Date;
}
