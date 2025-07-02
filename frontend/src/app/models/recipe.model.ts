import { Ingredient } from './ingredient.model';

export interface Recipe {
  id: string;
  title: string;
  categories: string[];
  favorite: boolean;
  ingredients: RecipeIngredient[];
  instructions: string[];
  description: string;
  photos: string[];
  cost: number;
  cost_unit: string;
  cookingTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

type RecipeIngredient = {
  id: string;
  quantity: number;
};
