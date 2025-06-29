import { Ingridient } from './ingridient.model';

export interface Recipe {
  id: string;
  title: string;
  categories: string[];
  ingridients: RecipeIngridient[];
  description: string;
  photos: string[];
  cost: number;
  cookingTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

type RecipeIngridient = {
  id: string;
  quantity: string;
};
