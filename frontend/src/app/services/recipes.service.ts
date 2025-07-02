import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Recipe } from '../models/recipe.model';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService implements OnInit {
  private httpClient = inject(HttpClient);

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

  public async getRecipes(filter?: any): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const body = filter || {};
    const recipes = await firstValueFrom(
      this.httpClient.post(
        environment.BASE_URL + '/recipes/find',
        body,
        headers
      )
    );
    if (recipes) {
      this.recipesSubject.next(recipes as Recipe[]);
    } else {
      console.error('Error fetching recipes:', recipes);
    }
    return recipes;
  }
}
