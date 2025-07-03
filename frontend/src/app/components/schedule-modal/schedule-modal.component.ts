import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, ModalController } from '@ionic/angular/standalone';
import { MatIconModule } from '@angular/material/icon';
import { addIcons } from 'ionicons';
import { add, addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonTitle,
  IonButton,
} from '@ionic/angular/standalone';
import { Recipe } from 'src/app/models/recipe.model';
import { Schedule } from 'src/app/models/schedule.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { RecipesService } from 'src/app/services/recipes.service';

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
  @Input() currentRecipe!: Recipe;

  public schedule: Schedule[] = [];

  groupedDays: {
    name: string;
    days: {
      date: Date;
      isToday: boolean;
      lunchRecipes: any;
      dinnerRecipes: any;
    }[];
  }[] = [];

  private modalCtrl = inject(ModalController);
  private scheduleService = inject(ScheduleService);
  private recipeService = inject(RecipesService);

  constructor() {
    addIcons({ add, addCircleOutline, removeCircleOutline });
  }

  ngOnInit() {
    // Subscribe to recipes updates
    this.scheduleService.schedule$.subscribe((updatedSchedule: Schedule[]) => {
      this.schedule = updatedSchedule;

      if (this.schedule.length) {
        console.log('Schedule updated: ', this.schedule);

        const today = new Date();
        const days: {
          date: Date;
          isToday: boolean;
          lunchRecipes: any;
          dinnerRecipes: any;
        }[] = [];

        for (let i = 0; i < 14; i++) {
          // Two weeks
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dateStr = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, '0'),
            String(date.getDate()).padStart(2, '0'),
          ].join('-');

          const matchLunch = this.getMatchSchedules(dateStr, 'lunch');
          const matchDinner = this.getMatchSchedules(dateStr, 'dinner');

          days.push({
            date,
            isToday: date.toDateString() === today.toDateString(),
            lunchRecipes: {
              scheduleId: matchLunch.id,
              title: matchLunch.title,
              recipeId: matchLunch.recipeId,
            },
            dinnerRecipes: {
              scheduleId: matchDinner.id,
              title: matchDinner.title,
              recipeId: matchDinner.recipeId,
            },
          });
        }
        // Group by month
        const grouped: {
          [month: string]: {
            date: Date;
            isToday: boolean;
            lunchRecipes: string;
            dinnerRecipes: string;
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
      return;
    });
  }

  getMatchSchedules(dateStr: string, period: 'lunch' | 'dinner') {
    // Find schedules that match the date
    // Find schedules that match the date and period
    const matches = this.schedule.filter(
      (s) =>
        s.period === period &&
        new Date(s.date).toISOString().split('T')[0] === dateStr
    );
    const id = matches[0]?.recipes[0];

    return {
      id: matches[0]?.id,
      title: this.recipeService.getRecipeById(id)?.title,
      recipeId: id,
    };
  }

  addRecipe(date: Date, data: any, meal: 'lunch' | 'dinner') {
    if (data.scheduleId) {
      this.scheduleService.updateSchedule(data.scheduleId, {
        recipes: this.currentRecipe.id,
      });
    } else {
      this.scheduleService.addSchedule({
        date: this.getLocalDate(date),
        period: meal,
        recipes: [this.currentRecipe.id],
      });
    }
  }

  removeRecipe(scheduleId: string) {
    this.scheduleService.deleteSchedule(scheduleId);
  }

  // Format a Date object to "YYYY-MM-DD" in local time
  getLocalDate(date: Date): Date {
    // Set to noon local time to avoid UTC offset issues
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      12,
      0,
      0
    );
  }

  done() {
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
