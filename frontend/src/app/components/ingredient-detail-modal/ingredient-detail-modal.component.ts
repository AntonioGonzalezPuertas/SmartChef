import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  pricetagOutline,
  storefrontOutline,
  cubeOutline,
  cashOutline,
  barChartOutline,
  cartOutline,
  informationCircleOutline,
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
} from '@ionic/angular/standalone';
import { IngredientNewModalComponent } from '../ingredient-new-modal/ingredient-new-modal.component';
import { IngredientService } from 'src/app/services/ingredients.service';
@Component({
  selector: 'app-ingredient-detail',
  templateUrl: './ingredient-detail-modal.component.html',
  styleUrls: ['./ingredient-detail-modal.component.scss'],
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
  ],
})
export class IngredientDetailModalComponent {
  @Input() ingredient: any;
  private modalCtrl = inject(ModalController);
  private ingredientService = inject(IngredientService);

  constructor() {
    addIcons({
      pricetagOutline,
      storefrontOutline,
      cubeOutline,
      cashOutline,
      barChartOutline,
      cartOutline,
      informationCircleOutline,
    });
  }
  async editIngredient() {
    const modal = await this.modalCtrl.create({
      component: IngredientNewModalComponent,
      componentProps: { ingredient: this.ingredient },
    });
    await modal.present();
    this.ingredient = await modal.onWillDismiss().then((result) => {
      return result.data;
    });
  }

  async deleteIngredient() {
    this.ingredientService.deleteIngredient(this.ingredient.id);
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
