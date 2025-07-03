import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';

import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
  standalone: true,
  imports: [RecipeComponent, IonContent, IonIcon, IonList, IonItem, IonLabel],
})
export class RecommendationsComponent implements OnInit {
  recommendedRecipes = [
    { title: 'Avocado Toast' /* ...other recipe data... */ },
    { title: 'Quinoa Bowl' /* ...other recipe data... */ },
    // ...add more recipes as needed
  ];
  constructor() {}

  ngOnInit() {}
}
