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

  public async addRecipe(recipe: Recipe): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const result = await firstValueFrom(
      this.httpClient.post(environment.BASE_URL + '/recipes', recipe, headers)
    );
    if (result) {
      const currentRecipes = this.recipesSubject.getValue();
      this.recipesSubject.next([...(<any>currentRecipes), result]);
    } else {
      console.error('Error adding recipe:', result);
    }
    return result;
  }

  public async updateRecipe(id: string, data: any): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const result = await firstValueFrom(
      this.httpClient.put(
        environment.BASE_URL + '/recipes/' + id,
        data,
        headers
      )
    );
    if (result) {
      const currentRecipes = this.recipesSubject.getValue();
      const index = currentRecipes.findIndex((x) => x.id === id);
      if (index !== -1) {
        currentRecipes[index] = <Recipe>result;
        this.recipesSubject.next([...currentRecipes]);
      }
    } else {
      console.error('Error adding recipe:', result);
    }
    return result;
  }

  public async deleteRecipe(id: string): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const result = await firstValueFrom(
      this.httpClient.delete(environment.BASE_URL + '/recipes/' + id, headers)
    );
    console.log('delete result', result);
    if (result) {
      const currentRecipes = this.recipesSubject.getValue();
      const updatedRecipes = currentRecipes.filter(
        (recipe) => recipe.id !== id
      );
      this.recipesSubject.next(updatedRecipes);
    } else {
      console.error('Error deleting recipe:', result);
    }
    return result;
  }
}
