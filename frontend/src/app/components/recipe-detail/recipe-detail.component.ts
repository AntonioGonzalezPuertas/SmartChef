import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  pricetagOutline,
  storefrontOutline,
  timeOutline,
  cashOutline,
  barChartOutline,
  cartOutline,
  informationCircleOutline,
  play,
} from 'ionicons/icons';
import {
  ModalController,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonTitle,
  IonButton,
  IonLabel,
  IonItem,
  IonList,
} from '@ionic/angular/standalone';
import { RecipeNewModalComponent } from '../recipe-new-modal/recipe-new-modal.component';
import { RecipesService } from 'src/app/services/recipes.service';
import { IngredientService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonButton,
    IonIcon,
    IonLabel,
    IonItem,
    IonList,
  ],
})
export class RecipeDetailComponent {
  @Input() recipe: any;
  private modalCtrl = inject(ModalController);
  private recipeService = inject(RecipesService);
  private ingredientService = inject(IngredientService);
  public ingredients: { name: string; units: string; quantity: any }[] = [];

  constructor() {
    addIcons({
      pricetagOutline,
      storefrontOutline,
      timeOutline,
      cashOutline,
      barChartOutline,
      cartOutline,
      informationCircleOutline,
      play,
    });
  }

  ngOnInit() {
    this.ingredients = this.getIngredients(this.recipe);
  }
  async editRecipe() {
    const modal = await this.modalCtrl.create({
      component: RecipeNewModalComponent,
      componentProps: { recipe: this.recipe, allIngredients: this.ingredients },
    });
    await modal.present();
    this.recipe = await modal.onWillDismiss().then((result) => {
      return result.data;
    });
  }

  async deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.dismiss();
  }

  getIngredients(
    recipe: any
  ): { name: string; units: string; quantity: any }[] {
    const ingredients = recipe.ingredients.map((ingredient: any) => {
      const ing = this.ingredientService.getIngredientById(ingredient.id);
      return {
        id: ing!.id,
        name: ing!.name,
        units: ing!.units,
        quantity: ingredient.quantity,
      };
    });
    return ingredients;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
