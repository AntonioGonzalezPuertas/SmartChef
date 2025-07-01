import { Component, inject, Input } from '@angular/core';
import {
  ModalController,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonNote,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-recipe-ingredients-modal',
  templateUrl: './recipe-ingredients-modal.component.html',
  styleUrls: ['./recipe-ingredients-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonNote,
    IonModal,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
  ],
})
export class RecipeIngredientsModalComponent {
  @Input() ingredients: any[] = [];
  private modalCtrl = inject(ModalController);

  constructor() {}
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
