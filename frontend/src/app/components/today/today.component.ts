import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonList, IonItem, IonLabel],
})
export class TodayComponent implements OnInit {
  weekMenu = [
    {
      name: 'Monday',
      lunchRecipe: { title: 'Chicken Salad' },
      dinnerRecipe: { title: 'Pasta Carbonara' },
    },
    {
      name: 'Tuesday',
      lunchRecipe: { title: 'Grilled Salmon' },
      dinnerRecipe: { title: 'Vegetable Stir Fry' },
    },
    // ...add more days as needed
  ];
  constructor() {}

  ngOnInit() {}
}
