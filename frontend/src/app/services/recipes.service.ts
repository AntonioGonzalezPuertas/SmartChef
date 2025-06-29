import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Recipe } from '../models/recipe.model';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService implements OnInit {
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  public recipes$ = this.recipesSubject.asObservable();

  constructor() {
    this.ngOnInit();
  }

  async ngOnInit() {
    if (environment.dev) {
      // In development mode, fetch recipes from dummy data
      console.log('Using mock data for recipes');

      const data = await import(
        'src/app/services/dummyData/dummyRecipesData.json'
      );
      // Convert date strings to Date objects
      const recipes = data.default.map((recipe: any) => ({
        ...recipe,
        createdAt: new Date(recipe.createdAt),
        updatedAt: new Date(recipe.updatedAt),
      }));

      this.recipesSubject.next(recipes as Recipe[]);
    } else {
      await this.getRecipes();
    }
  }

  public async getRecipes(): Promise<any> {}
}
