import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegistrationPageComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  // exports: [RegistrationPageComponent],
})
export class AdminModule {}
