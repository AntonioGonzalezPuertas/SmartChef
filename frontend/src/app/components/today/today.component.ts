import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  ModalController,
} from '@ionic/angular/standalone';

import { ScheduleService } from 'src/app/services/schedule.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Schedule } from 'src/app/models/schedule.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    IonContent,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class TodayComponent implements OnInit {
  private modalCtrl = inject(ModalController);

  private scheduleService = new ScheduleService();
  private recipesService = new RecipesService();
  public lunch: any = {};
  public dinner: any = {};

  private schedule: Schedule[] = [];

  groupedDays: {
    name: string;
    days: {
      date: Date;
      isToday: boolean;
      lunchRecipes: any;
      dinnerRecipes: any;
    }[];
  }[] = [];

  constructor() {}

  async ngOnInit() {
    const schedule = await this.scheduleService.getSchedule();
    const recipes = await this.recipesService.getRecipes();

    this.lunch = this.scheduleService.getToday('lunch');
    this.dinner = this.scheduleService.getToday('dinner');

    if (this.lunch?.recipes) {
      this.lunch.recipes = this.recipesService.getRecipeById(
        this.lunch.recipes[0]
      );
    }
    if (this.dinner?.recipes) {
      this.dinner.recipes = this.recipesService.getRecipeById(
        this.dinner.recipes[0]
      );
    }

    console.log('Lunch ', this.lunch);
    console.log('Dinner ', this.dinner);
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
      title: this.recipesService.getRecipeById(id)?.title,
      recipeId: id,
    };
  }

  async openRecipe(recipe: Recipe) {
    if (recipe) {
      const modal = await this.modalCtrl.create({
        component: RecipeDetailComponent,
        componentProps: { recipe: recipe || [] },
      });
      await modal.present();
    }
  }
}
