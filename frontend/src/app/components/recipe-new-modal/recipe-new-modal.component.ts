import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipesService } from 'src/app/services/recipes.service';
import { Ingredient } from 'src/app/models/ingredient.model';
import { addIcons } from 'ionicons';
import { add, addCircleOutline, removeCircleOutline } from 'ionicons/icons';
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
  IonSelectOption,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-recipe-new-modal',
  templateUrl: './recipe-new-modal.component.html',
  styleUrls: ['./recipe-new-modal.component.scss'],
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
    IonSelectOption,
  ],
})
export class RecipeNewModalComponent {
  @Input() recipe: any;
  @Input() allIngredients: any[] = [];

  form: FormGroup;
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipesService);
  compareWithFn = (o1: any, o2: any) => o1 === o2;
  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  get instructions(): FormArray {
    return this.form.get('instructions') as FormArray;
  }
  constructor() {
    addIcons({ add, addCircleOutline, removeCircleOutline });

    this.form = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      categories: [''],
      favorite: [false],
      ingredients: this.fb.array([this.createIngredientGroup()]),
      instructions: this.fb.array([this.createInstructionGroup()]),
      description: [''],
      photos: [''],
      cost: [0, [Validators.min(0)]],
      cost_unit: [''],
      cookingTime: [0, [Validators.min(0)]],
      createdAt: [new Date()],
      updatedAt: [new Date()],
    });
  }

  ngOnInit(): void {
    if (this.recipe) {
      this.form.patchValue(this.recipe);

      // Patch ingredients
      if (this.allIngredients && this.allIngredients.length) {
        this.ingredients.clear();
        for (const ing of this.allIngredients) {
          this.ingredients.push(
            this.fb.group({
              id: [ing.id],
              name: [ing.name],
              units: [ing.units],
              quantity: [ing.quantity, [Validators.min(0)]],
            })
          );
        }
      }

      // Patch instructions
      if (this.recipe.instructions && this.recipe.instructions.length) {
        this.instructions.clear();
        for (const inst of this.recipe.instructions) {
          this.instructions.push(
            this.fb.group({ text: [inst, Validators.required] })
          );
        }
      }
    }
  }

  createIngredientGroup() {
    return this.fb.group({
      id: [''],
      name: [''],
      units: [''],
      quantity: [1, [Validators.min(0.01)]],
    });
  }

  addIngredient() {
    this.ingredients.push(this.createIngredientGroup());
  }
  removeIngredient(index: number) {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  createInstructionGroup() {
    return this.fb.group({
      text: ['', Validators.required],
    });
  }

  addInstruction() {
    this.instructions.push(this.createInstructionGroup());
  }

  removeInstruction(index: number) {
    if (this.instructions.length > 1) {
      this.instructions.removeAt(index);
    }
  }

  async save() {
    if (this.form.valid) {
      const value = this.form.value;
      // Convert categories to array
      value.categories = Array.isArray(value.categories)
        ? value.categories
        : value.categories
        ? value.categories.split(',').map((c: string) => c.trim())
        : [];
      // Convert photos to array
      value.photos = Array.isArray(value.photos)
        ? value.photos
        : value.photos
        ? value.photos.split(',').map((p: string) => p.trim())
        : [];
      // Flatten instructions to array of strings
      value.instructions = value.instructions.map((inst: any) => inst.text);

      if (this.recipe) {
        await this.recipeService.updateRecipe(this.recipe.id, value);
      } else {
        await this.recipeService.addRecipe(value);
      }
      this.modalCtrl.dismiss(value, 'confirm');
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
