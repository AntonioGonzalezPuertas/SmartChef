import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IngredientService } from 'src/app/services/ingredients.service';

import {
  ModalController,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonTitle,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-ingredient-new-modal',
  templateUrl: './ingredient-new-modal.component.html',
  styleUrls: ['./ingredient-new-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
  ],
})
export class IngredientNewModalComponent {
  form: FormGroup;
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  private ingredientService = inject(IngredientService);

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      categories: [''],
      shops: [''],
      units: [''],
      description: [''],
      photo: [''],
      stock: [0, [Validators.min(0)]],
      min_stock: [0, [Validators.required, Validators.min(0)]],
      ordered: [0, [Validators.min(0)]],
      price: [0, [Validators.min(0)]],
      price_unit: [''],
    });
  }

  async save() {
    if (this.form.valid) {
      const value = this.form.value;
      // Convert comma-separated strings to arrays
      value.categories = value.categories
        ? value.categories.split(',').map((c: string) => c.trim())
        : [];
      value.shops = value.shops
        ? value.shops.split(',').map((s: string) => s.trim())
        : [];
      const result = await this.ingredientService.addIngredient(value);
      console.log('Ingredient added:', result);

      this.modalCtrl.dismiss(value);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
