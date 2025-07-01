import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, ModalController } from '@ionic/angular/standalone';
import { MatIconModule } from '@angular/material/icon';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonTitle,
  IonButton,
} from '@ionic/angular/standalone';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.scss'],
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
    MatIconModule,
  ],
})
export class ScheduleModalComponent {
  @Input() assignedRecipes: {
    [date: string]: { lunchRecipes: Recipe[]; dinnerRecipes: Recipe[] };
  } = {};
  @Input() currentRecipe!: Recipe;

  groupedDays: {
    name: string;
    days: {
      date: Date;
      isToday: boolean;
      lunchRecipes: Recipe[];
      dinnerRecipes: Recipe[];
    }[];
  }[] = [];

  private modalCtrl = inject(ModalController);
  constructor() {}

  ngOnInit() {
    const today = new Date();
    const days: {
      date: Date;
      isToday: boolean;
      lunchRecipes: Recipe[];
      dinnerRecipes: Recipe[];
    }[] = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      days.push({
        date,
        isToday: date.toDateString() === today.toDateString(),
        lunchRecipes: this.assignedRecipes[dateStr]?.lunchRecipes || [],
        dinnerRecipes: this.assignedRecipes[dateStr]?.dinnerRecipes || [],
      });
    }
    // Group by month
    const grouped: {
      [month: string]: {
        date: Date;
        isToday: boolean;
        lunchRecipes: Recipe[];
        dinnerRecipes: Recipe[];
      }[];
    } = {};
    days.forEach((day) => {
      const month = day.date.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(day);
    });
    this.groupedDays = Object.entries(grouped).map(([name, days]) => ({
      name,
      days,
    }));
  }

  addRecipe(day: any, meal: 'lunchRecipes' | 'dinnerRecipes') {
    day[meal].push(this.currentRecipe);
  }

  replaceRecipe(day: any, meal: 'lunchRecipes' | 'dinnerRecipes', idx: number) {
    day[meal][idx] = this.currentRecipe;
  }

  save() {
    console.log('Saved');
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
