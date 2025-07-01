import { Component } from '@angular/core';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';

import { RecipeComponent } from '../components/recipe/recipe.component';
@Component({
  selector: 'app-home',
  templateUrl: './tabHome.page.html',
  styleUrls: ['./tabHome.page.scss'],
  standalone: true,
  imports: [RecipeComponent, IonContent, IonIcon, IonList, IonItem, IonLabel],
})
export class tabHomePage {
  // Example data, replace with your real data/services
  outOfStockIngredients = [{ name: 'Tomatoes' }, { name: 'Olive Oil' }];

  weekMenu = [
    {
      name: 'Monday',
      lunchRecipe: { title: 'Chicken Salad' },
      dinnerRecipe: { title: 'Pasta Carbonara' },
    },
    {
      name: 'Tuesday',
      lunchRecipe: { title: 'Grilled Salmon' },
      dinnerRecipe: { title: 'Vegetable Stir Fry' },
    },
    // ...add more days as needed
  ];

  recommendedRecipes = [
    { title: 'Avocado Toast' /* ...other recipe data... */ },
    { title: 'Quinoa Bowl' /* ...other recipe data... */ },
    // ...add more recipes as needed
  ];
}
