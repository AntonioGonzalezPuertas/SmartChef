import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonChip,
  IonLabel,
  IonNote,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  basket,
  play,
  cashOutline,
  timeOutline,
  starOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonChip,
    IonLabel,
    IonNote,
    IonIcon,
    IonButton,
  ],
})
export class RecipeComponent implements OnInit {
  @Input() recipe: any;

  constructor() {
    addIcons({ basket, play, cashOutline, timeOutline, starOutline });
  }

  ngOnInit() {}
}
