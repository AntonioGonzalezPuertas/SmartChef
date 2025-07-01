import { Component, inject, Input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonTitle,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-recipe-instructions-modal',
  templateUrl: './recipe-instructions-modal.component.html',
  styleUrls: ['./recipe-instructions-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonButton,
  ],
})
export class RecipeInstructionsModalComponent {
  @Input() instructions: string[] = [];
  private modalCtrl = inject(ModalController);
  constructor() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
