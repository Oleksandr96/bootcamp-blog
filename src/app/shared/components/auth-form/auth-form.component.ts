import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../../interfaces/user.interface';
import { AppAuthService } from '../../../services/app-auth.service';
import { Subscription } from 'rxjs';
import { AppValidationService } from '../../../services/app-validation.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, OnDestroy {
  authForm!: FormGroup;
  passwordHide: boolean = true;

  authFormErrors: any = {
    email: null,
    password: null,
  };

  authSub!: Subscription;

  validationMessages: any = {
    email: {
      required: 'Field required',
    },
    password: {
      required: 'Field required',
    },
  };

  constructor(
    public dialogRef: MatDialogRef<AuthFormComponent>,
    private appAuthService: AppAuthService,
    private appValidationService: AppValidationService
  ) {}

  dialogClose() {
    this.authForm.reset();
    this.dialogRef.close();
  }

  submit(): void {
    if (this.authForm.valid) {
      this.authForm.disable();
      const user: User = this.authForm.value;
      this.authSub = this.appAuthService
        .login(user)
        .subscribe(() => this.dialogRef.close());
    }
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.authForm.valueChanges.subscribe(
      (x) =>
        this.appValidationService.onFormChange(
          this.authForm,
          this.authFormErrors,
          this.validationMessages
        ),
      (error) => this.authForm.enable()
    );
  }
}
