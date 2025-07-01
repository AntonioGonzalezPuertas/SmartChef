import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonChip,
  IonLabel,
  IonNote,
  IonIcon,
  IonButton,
  IonBadge,
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
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonChip,
    IonLabel,
    IonNote,
    IonIcon,
    IonButton,
    IonBadge,
  ],
})
export class RecipeComponent implements OnInit {
  @Input() recipe: any;
  public missingStock: number = 0;
  private ingredientService = inject(IngredientService);

  constructor() {
    addIcons({ basket, play, cashOutline, timeOutline, starOutline });
  }

  ngOnInit() {
    this.ingredientService.ingredients$.subscribe((ingredients) => {
      this.missingStock = this.checkStock();
    });
  }

  private checkStock(): number {
    const ingredients = this.recipe.ingredients || [];
    let missingCount = 0;

    ingredients.forEach((ingredient: any) => {
      if (!this.ingredientService.isInStock(ingredient)) {
        missingCount++;
      }
    });

    return missingCount;
  }
}
