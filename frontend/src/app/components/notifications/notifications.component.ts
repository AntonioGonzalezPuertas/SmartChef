import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  warningOutline,
  alertCircleOutline,
  notifications,
} from 'ionicons/icons';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonList, IonItem, IonLabel],
})
export class NotificationsComponent implements OnInit {
  outOfStockIngredients = [
    { name: 'Tomatoes', notification: 'out-of-stock' },
    { name: 'Olive Oil', notification: 'out-of-stock' },
    { name: 'Garlic', notification: 'out-of-min-stock' },
  ];

  constructor() {
    // Add icons to the ionicons library
    addIcons({
      warningOutline,
      alertCircleOutline,
    });
  }

  ngOnInit() {}
}
