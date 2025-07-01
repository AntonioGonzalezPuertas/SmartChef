import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeIngredientsModalComponent } from '../recipe-ingredients-modal/recipe-ingredients-modal.component';
import { RecipeInstructionsModalComponent } from '../recipe-instructions-modal/recipe-instructions-modal.component';
import { ScheduleModalComponent } from '../schedule-modal/schedule-modal.component';
import { MatIconModule } from '@angular/material/icon';

import {
  ModalController,
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
  star,
  checkmarkCircle,
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
    MatIconModule,
  ],
})
export class RecipeComponent implements OnInit {
  @Input() recipe: any;
  public missingStock: number = 0;
  private ingredientService = inject(IngredientService);
  private modalCtrl = inject(ModalController);

  constructor() {
    addIcons({
      basket,
      play,
      cashOutline,
      timeOutline,
      starOutline,
      star,
      checkmarkCircle,
    });
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

  async showIngredients() {
    // Get all ingredients with stock info
    const allIngredients = this.recipe.ingredients.map((ing: any) => {
      const stockIng = this.ingredientService.getIngredientById(ing.id);
      return {
        ...ing,
        name: stockIng?.name || 'Unknown',
        stock: stockIng?.stock ?? 0,
        inStock: stockIng ? ing.quantity <= stockIng.stock : false,
        units: stockIng?.units || 'N/A',
      };
    });

    const modal = await this.modalCtrl.create({
      component: RecipeIngredientsModalComponent,
      componentProps: { ingredients: allIngredients },
    });
    await modal.present();
  }

  async showInstructions() {
    // Get the instructions for the recipe
    const modal = await this.modalCtrl.create({
      component: RecipeInstructionsModalComponent,
      componentProps: { instructions: this.recipe.instructions || [] },
    });
    await modal.present();
  }

  toggleFavorite() {
    this.recipe.favorite = !this.recipe.favorite;
  }

  async schedule() {
    const modal = await this.modalCtrl.create({
      component: ScheduleModalComponent,
      componentProps: { currentRecipe: this.recipe || [] },
    });
    await modal.present();
  }
}
