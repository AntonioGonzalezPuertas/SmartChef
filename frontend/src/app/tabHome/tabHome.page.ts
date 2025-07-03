import { Component } from '@angular/core';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  restaurantOutline,
  sunnyOutline,
  sparklesOutline,
  notifications,
} from 'ionicons/icons';

import { TodayComponent } from '../components/today/today.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { RecommendationsComponent } from '../components/recommendations/recommendations.component';
@Component({
  selector: 'app-home',
  templateUrl: './tabHome.page.html',
  styleUrls: ['./tabHome.page.scss'],
  standalone: true,
  imports: [
    TodayComponent,
    NotificationsComponent,
    RecommendationsComponent,
    IonContent,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class tabHomePage {
  constructor() {
    // Add icons to the ionicons library
    addIcons({
      restaurantOutline,
      sunnyOutline,
      sparklesOutline,
      notifications,
    });
  }

  ngOnInit() {}
}
