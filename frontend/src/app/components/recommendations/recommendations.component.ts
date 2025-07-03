import { Component, inject, OnInit } from '@angular/core';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';

import { RecipeComponent } from '../recipe/recipe.component';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
  standalone: true,
  imports: [RecipeComponent, IonContent, IonIcon, IonList, IonItem, IonLabel],
})
export class RecommendationsComponent implements OnInit {
  private recipesService = inject(RecipesService);
  private recipes: Recipe[] = [];
  public recommendedRecipes: Recipe[] = [];

  constructor() {}

  async ngOnInit() {
    this.recipes = await this.recipesService.getRecipes();
    this.recommendedRecipes = this.recipes
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }
}
