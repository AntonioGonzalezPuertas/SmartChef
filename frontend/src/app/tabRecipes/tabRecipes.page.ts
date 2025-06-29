import { Component, inject } from '@angular/core';
import {
  IonList,
  IonItem,
  IonLabel,
  IonContent,
} from '@ionic/angular/standalone';

import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe.model';
import { RecipeComponent } from '../components/recipe/recipe.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../components/utils/search/search.component';

@Component({
  selector: 'app-tabRecipes',
  templateUrl: 'tabRecipes.page.html',
  styleUrls: ['tabRecipes.page.scss'],
  imports: [
    CommonModule,
    SearchComponent,
    IonList,
    IonItem,
    IonLabel,
    RecipeComponent,
    IonContent,
  ],
})
export class tabRecipesPage {
  private recipesService = inject(RecipesService);
  public selectedCategories: string[] = [];
  public filteredRecipes: Recipe[] = [];
  public loadingData: boolean = false;
  public noResults: boolean = false;

  public recipes: Recipe[] = [];

  constructor() {}

  async ngOnInit() {
    // Subscribe to recipes updates
    this.recipesService.recipes$.subscribe((updatedRecipes: Recipe[]) => {
      this.recipes = updatedRecipes;
    });
  }

  onFilteredRecipes(filtered: any[]) {
    this.filteredRecipes = filtered;
    if (this.filteredRecipes.length === 0 && !this.loadingData) {
      this.noResults = true;
    } else {
      this.noResults = false;
    }
  }
}
