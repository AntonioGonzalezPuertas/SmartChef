import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IonButtons,
  IonHeader,
  IonButton,
  IonIcon,
  ModalController,
  IonTitle,
  IonToolbar,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';
import { inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonButtons,
    IonButton,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    ReactiveFormsModule,
  ],
})
export class ForgotPasswordModalComponent {
  public forgotForm: FormGroup;
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);

  constructor() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onForgotPassword() {
    if (this.forgotForm.valid) {
      this.modalCtrl.dismiss({
        valid: true,
        email: this.forgotForm.value.email,
      });
    }
  }
}
