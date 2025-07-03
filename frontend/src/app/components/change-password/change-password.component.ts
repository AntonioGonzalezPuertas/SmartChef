import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ModalController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonLabel,
  IonItem,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonLabel,
    IonItem,
    IonButton,
    IonInput,
    IonLabel,
  ],
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  private modalController = inject(ModalController);
  private fb = inject(FormBuilder);

  constructor() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  dismissModal(data: any = null) {
    this.modalController.dismiss(data);
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } =
        this.passwordForm.value;

      if (newPassword !== confirmPassword) {
        console.error('Passwords do not match!');
        this.dismissModal('Passwords do not match'); // Close the modal after successful submission
      }
      console.log('Saving Password..');
      this.dismissModal(this.passwordForm.value); // Close the modal after successful submission
    }
  }
}
