import { ViewChildren, QueryList, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalController } from '@ionic/angular/standalone';
import {
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
} from '@ionic/angular/standalone';

import { IngredientService } from '../services/ingredients.service';
import { Ingredient } from '../models/ingredient.model';
import { IngredientComponent } from '../components/ingredient/ingredient.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../components/utils/search/search.component';
import { IngredientDetailModalComponent } from '../components/ingredient-detail-modal/ingredient-detail-modal.component';
import { IngredientNewModalComponent } from '../components/ingredient-new-modal/ingredient-new-modal.component';
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
    IonFab,
    IonFabButton,
    IonFabList,
    MatIconModule,
  ],
})
export class tabIngredientsPage {
  private ingredientsService = inject(IngredientService);

  @ViewChildren('ingredientComp')
  ingredientComps!: QueryList<IngredientComponent>;

  public selectedCategories: string[] = [];
  public filteredIngredients: Ingredient[] = [];
  public loadingData: boolean = false;
  public noResults: boolean = false;
  public action: String = 'info_i';

  public ingredients: Ingredient[] = [];
  private modalCtrl = inject(ModalController);

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
      // If ing.categories is empty or not present, add to "Others"
      if (!ing.categories || ing.categories.length === 0) {
        if (!grouped['Others']) grouped['Others'] = [];
        grouped['Others'].push(ing);
      } else {
        for (const cat of ing.categories) {
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(ing);
        }
      }
    }
    // Convert to array and sort so "Others" is last
    const entries = Object.entries(grouped)
      .map(([category, ingredients]) => ({ category, ingredients }))
      .sort((a, b) => {
        if (a.category === 'Others') return 1;
        if (b.category === 'Others') return -1;
        return a.category.localeCompare(b.category);
      });
    return entries;
  }

  public async clickAction(ingredientId: string) {
    // Find the child component for the clicked ingredient
    const comp = this.ingredientComps.find(
      (c) => c.ingredient.id === ingredientId
    );

    if (this.action === 'info_i') {
      await this.openInfo(ingredientId);
    } else if (this.action === 'remove') {
      console.log('Remove icon clicked');
      comp!.updateStock('remove');
    } else if (this.action === 'add') {
      comp!.updateStock('add');
    } else if (this.action === 'shopping_cart_checkout') {
      comp!.updateOrdered('checkout');
    } else if (this.action === 'remove_shopping_cart') {
      comp!.updateOrdered('remove');
    } else if (this.action === 'add_shopping_cart') {
      comp!.updateOrdered('add');
    }
  }

  async addNew() {
    this.action = 'info_i';

    const modal = await this.modalCtrl.create({
      component: IngredientNewModalComponent,
    });
    await modal.present();
  }

  async openInfo(id: string) {
    let ingredient = this.filteredIngredients.find((i) => i.id === id);

    const modal = await this.modalCtrl.create({
      component: IngredientDetailModalComponent,
      componentProps: { ingredient: ingredient || {} },
    });
    await modal.present();
  }
}
