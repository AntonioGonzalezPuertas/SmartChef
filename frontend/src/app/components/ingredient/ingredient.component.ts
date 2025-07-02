import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import {
  IonCard,
  IonCardTitle,
  IonImg,
  IonChip,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  basket,
  play,
  cashOutline,
  timeOutline,
  starOutline,
} from 'ionicons/icons';

import { IngredientService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss'],
  imports: [
    CommonModule,
    IonCard,
    IonCardTitle,
    IonImg,
    IonChip,
    IonIcon,
    MatIconModule,
  ],
})
export class IngredientComponent implements OnInit {
  @Input() ingredient: any;
  private ingredientService = new IngredientService();

  constructor() {
    addIcons({ basket, play, cashOutline, timeOutline, starOutline });
  }

  ngOnInit() {}

  public updateStock(action: string) {
    if (action === 'add') {
      this.ingredient.stock = this.ingredient.stock + 1;
    } else if (action === 'remove' && this.ingredient.stock > 0) {
      this.ingredient.stock = this.ingredient.stock - 1;
    }
    this.ingredientService.updateIngredient(this.ingredient.id, {
      stock: this.ingredient.stock,
    });
  }

  public updateOrdered(action: string) {
    if (action === 'add') {
      this.ingredient.ordered = this.ingredient.ordered + 1;
    } else if (action === 'remove' && this.ingredient.ordered > 0) {
      this.ingredient.ordered = this.ingredient.ordered - 1;
    } else if (action === 'checkout' && this.ingredient.ordered > 0) {
      this.ingredient.ordered = this.ingredient.ordered - 1;
      this.ingredient.stock = this.ingredient.stock + 1;
    }
    this.ingredientService.updateIngredient(this.ingredient.id, {
      stock: this.ingredient.stock,
      ordered: this.ingredient.ordered,
    });
  }
}
