import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Ingredient } from '../models/ingredient.model';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private httpClient = inject(HttpClient);

  private ingredientsSubject = new BehaviorSubject<Ingredient[]>([]);
  public ingredients$ = this.ingredientsSubject.asObservable();

  constructor() {
    this.init();
  }

  private async init() {
    if (environment.dev) {
      // In development mode, fetch recipes from dummy data
      console.log('Using mock data for ingredients');

      const data = await import(
        'src/app/services/dummyData/dummyIngredientsData.json'
      );
      // Convert date strings to Date objects
      const ingredients = data.default.map((ingredient: any) => ({
        ...ingredient,
        createdAt: new Date(ingredient.createdAt),
        updatedAt: new Date(ingredient.updatedAt),
      }));

      this.ingredientsSubject.next(ingredients as Ingredient[]);
    } else {
      await this.getIngredients();
    }
  }

  public getIngredientById(id: string): Ingredient | undefined {
    const current = this.ingredientsSubject.getValue();
    return current.find((ingredient) => ingredient.id === id);
  }

  public isInStock(ingredient: { id: string; quantity: number }): boolean {
    let stock = this.getIngredientById(ingredient.id)?.stock;
    return ingredient.quantity <= stock!;
  }

  public async getIngredients(filter?: any): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const body = filter || {};
    const ingredients = await firstValueFrom(
      this.httpClient.post(
        environment.BASE_URL + '/ingredients/find',
        body,
        headers
      )
    );
    if (ingredients) {
      this.ingredientsSubject.next(ingredients as Ingredient[]);
    } else {
      console.error('Error fetching ingredients:', ingredients);
    }
    return ingredients;
  }

  public async addIngredient(ingredient: Ingredient): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const result = await firstValueFrom(
      this.httpClient.post(
        environment.BASE_URL + '/ingredients',
        ingredient,
        headers
      )
    );
    if (result) {
      const currentIngredients = this.ingredientsSubject.getValue();
      this.ingredientsSubject.next([...(<any>currentIngredients), result]);
    } else {
      console.error('Error adding ingredient:', result);
    }
    return result;
  }

  public async updateIngredient(id: string, data: any): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const result = await firstValueFrom(
      this.httpClient.put(
        environment.BASE_URL + '/ingredients/' + id,
        data,
        headers
      )
    );
    if (result) {
      const currentIngredients = this.ingredientsSubject.getValue();
      const index = currentIngredients.findIndex((x) => x.id === id);
      if (index !== -1) {
        currentIngredients[index] = <Ingredient>result;
        this.ingredientsSubject.next([...currentIngredients]);
      }
    } else {
      console.error('Error adding ingredient:', result);
    }
    return result;
  }

  public async deleteIngredient(id: string): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const result = await firstValueFrom(
      this.httpClient.delete(
        environment.BASE_URL + '/ingredients/' + id,
        headers
      )
    );
    console.log('delete result', result);
    if (result) {
      const currentIngredients = this.ingredientsSubject.getValue();
      const updatedIngredients = currentIngredients.filter(
        (ingredient) => ingredient.id !== id
      );
      this.ingredientsSubject.next(updatedIngredients);
    } else {
      console.error('Error deleting ingredient:', result);
    }
    return result;
  }
}
