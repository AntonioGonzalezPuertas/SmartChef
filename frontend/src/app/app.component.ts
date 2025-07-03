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
  IonLabel,
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
import { AuthService } from './services/auth.service';

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
    IonLabel,
  ],
})
export class AppComponent {
  public auth = inject(AuthService);
  private router = inject(Router);
  public profile: any;

  private location = inject(Location);
  public showBackButton: boolean = false;
  public isSignUp: boolean = false; // Flag to toggle between login and signup
  public isHomenPage: boolean = false; // Flag to check if the current page is an account page
  constructor() {
    addIcons({ logOut, arrowBackOutline });
  }

  ngOnInit() {
    // Subscribe to profile updates
    this.auth.profile$.subscribe((updatedProfile) => {
      this.profile = updatedProfile;
    });

    this.auth.enabledSignUp$.subscribe((value: any) => {
      this.showBackButton = value;
      this.isSignUp = value;
    });

    this.auth.enabledSignUp$.subscribe((value: any) => {
      this.showBackButton = value;
      this.isSignUp = value;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomenPage = this.location.path().includes('/home');
        if (this.location.isCurrentPathEqualTo('/login')) {
          this.showBackButton = this.isSignUp; // Hide back button on login page
        } else {
          this.showBackButton = false; // Show back button on other pages
        }
      }
    });
  }

  goBack() {
    if (this.location.path().includes('/login')) {
      this.auth.isSignUp = false; // Reset the sign-up flag
    } else {
      this.location.back(); // Navigate back to the previous page
    }
  }

  logout() {
    this.auth.logout();
    this.auth.isLoggedIn = false;
    this.router.navigate(['/login'], {
      queryParams: { reload: true },
    }); // Add a query parameter
  }
}
