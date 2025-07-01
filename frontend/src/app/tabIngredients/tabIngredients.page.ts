import { ViewChildren, QueryList, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import {
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
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
    IonIcon,
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

  public clickAction(ingredientId: string) {
    // Find the child component for the clicked ingredient
    const comp = this.ingredientComps.find(
      (c) => c.ingredient.id === ingredientId
    );

    if (this.action === 'info_i') {
      console.log('Info icon clicked');
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
}
