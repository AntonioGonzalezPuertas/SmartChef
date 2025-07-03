import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  warningOutline,
  alertCircleOutline,
  notifications,
  checkmarkCircleOutline,
} from 'ionicons/icons';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';

import { IngredientService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonList, IonItem, IonLabel],
})
export class NotificationsComponent implements OnInit {
  private ingredientService = inject(IngredientService);
  public ingredients: Ingredient[] = [];
  public outOfStockIngredients: Ingredient[] = [];

  // outOfStockIngredients = [
  //   { name: 'Tomatoes', notification: 'out-of-stock' },
  //   { name: 'Olive Oil', notification: 'out-of-stock' },
  //   { name: 'Garlic', notification: 'out-of-min-stock' },
  // ];

  constructor() {
    // Add icons to the ionicons library
    addIcons({
      warningOutline,
      alertCircleOutline,
      checkmarkCircleOutline,
    });
  }

  async ngOnInit() {
    this.ingredients = await this.ingredientService.getIngredients();
    this.outOfStockIngredients = this.ingredients.filter(
      (ingredient) => ingredient.stock <= ingredient.min_stock
    );
  }
}
