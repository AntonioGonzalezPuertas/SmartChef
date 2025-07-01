import { Component, inject } from '@angular/core';
import {
  IonList,
  IonItem,
  IonLabel,
  IonContent,
} from '@ionic/angular/standalone';

import { IngredientService } from '../services/ingredients.service';
import { Ingredient } from '../models/ingredient.model';
import { IngredientComponent } from '../components/ingredient/ingredient.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../components/utils/search/search.component';

@Component({
  selector: 'app-tabIngredients',
  templateUrl: 'tabIngredients.page.html',
  styleUrls: ['tabIngredients.page.scss'],
  imports: [
    CommonModule,
    SearchComponent,
    IonList,
    IonItem,
    IonLabel,
    IngredientComponent,
    IonContent,
  ],
})
export class tabIngredientsPage {
  private ingredientsService = inject(IngredientService);
  public selectedCategories: string[] = [];
  public filteredIngredients: Ingredient[] = [];
  public loadingData: boolean = false;
  public noResults: boolean = false;

  public ingredients: Ingredient[] = [];

  constructor() {}

  async ngOnInit() {
    // Subscribe to recipes updates
    this.ingredientsService.ingredients$.subscribe(
      (updatedIngredients: Ingredient[]) => {
        this.ingredients = updatedIngredients;
      }
    );
  }

  onFilteredIngredients(filtered: any[]) {
    this.filteredIngredients = filtered;
    if (this.filteredIngredients.length === 0 && !this.loadingData) {
      this.noResults = true;
    } else {
      this.noResults = false;
    }
  }

  public getIngredientsByCategory(): {
    category: string;
    ingredients: Ingredient[];
  }[] {
    const grouped: { [key: string]: Ingredient[] } = {};
    for (const ing of this.filteredIngredients) {
      for (const cat of ing.categories) {
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(ing);
      }
    }
    return Object.entries(grouped).map(([category, ingredients]) => ({
      category,
      ingredients,
    }));
  }
}
