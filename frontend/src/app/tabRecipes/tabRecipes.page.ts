import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalController } from '@ionic/angular/standalone';
import {
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';

import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe.model';
import { RecipeComponent } from '../components/recipe/recipe.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../components/utils/search/search.component';
import { RecipeDetailComponent } from '../components/recipe-detail/recipe-detail.component';
import { RecipeNewModalComponent } from '../components/recipe-new-modal/recipe-new-modal.component';
@Component({
  selector: 'app-tabRecipes',
  templateUrl: 'tabRecipes.page.html',
  styleUrls: ['tabRecipes.page.scss'],
  imports: [
    CommonModule,
    SearchComponent,
    RecipeComponent,
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonFab,
    IonFabButton,
    MatIconModule,
  ],
})
export class tabRecipesPage {
  private recipesService = inject(RecipesService);
  public selectedCategories: string[] = [];
  public filteredRecipes: Recipe[] = [];
  public loadingData: boolean = false;
  public noResults: boolean = false;

  public recipes: Recipe[] = [];

  private modalCtrl = inject(ModalController);

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

  async openRecipe(recipe: Recipe) {
    const modal = await this.modalCtrl.create({
      component: RecipeDetailComponent,
      componentProps: { recipe: recipe || {} },
    });
    await modal.present();
  }

  async addNew() {
    const modal = await this.modalCtrl.create({
      component: RecipeNewModalComponent,
    });
    await modal.present();
  }
}
