import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-tabRecipes',
  templateUrl: 'tabRecipes.page.html',
  styleUrls: ['tabRecipes.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class tabRecipesPage {
  private recipesService = inject(RecipesService);

  public recipes: Recipe[] = [];

  constructor() {}

  async ngOnInit() {
    // Subscribe to recipes updates
    this.recipesService.recipes$.subscribe((updatedRecipes: Recipe[]) => {
      this.recipes = updatedRecipes;
    });
  }
}
