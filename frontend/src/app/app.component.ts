import { Component, inject } from '@angular/core';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonRouterOutlet,
  IonToolbar,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  logOut,
  arrowBackOutline,
  sadOutline,
  save,
  closeCircleOutline,
  calendarOutline,
} from 'ionicons/icons';
import {
  imagesOutline,
  informationCircleOutline,
  openOutline,
  close,
  add,
} from 'ionicons/icons';

import { Location } from '@angular/common';

addIcons({
  'images-outline': imagesOutline,
  'information-circle-outline': informationCircleOutline,
  'open-outline': openOutline,
  close: close,
  add: add,
  'sad-outline': sadOutline,
  save: save,
  'close-circle-outline': closeCircleOutline,
  'calendar-outline': calendarOutline,
});
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    CommonModule,
    IonApp,
    IonRouterOutlet,
    IonIcon,
    IonHeader,
    IonContent,
    IonToolbar,
    IonImg,
    IonButtons,
    IonButton,
  ],
})
export class AppComponent {
  private router = inject(Router);
  public profile: any;

  private location = inject(Location);
  public showBackButton: boolean = false;
  public isSignUp: boolean = false; // Flag to toggle between login and signup
  public isAccountPage: boolean = false; // Flag to check if the current page is an account page
  constructor() {
    addIcons({ logOut, arrowBackOutline });
  }

  ngOnInit() {}

  goBack() {}

  logout() {}
}
