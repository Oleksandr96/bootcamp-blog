import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../../interfaces/user.interface';
import { AppUserService } from '../../../services/user/app-user.service';
import { Subscription } from 'rxjs';
import { AppValidationService } from '../../../services/validation/app-validation.service';

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
      required: 'Field required.',
      email: 'Invalid email format.',
    },
    password: {
      required: 'Field required.',
      minlength: 'The minimum field length is 4 characters.',
    },
  };

  constructor(
    public dialogRef: MatDialogRef<AuthFormComponent>,
    private appAuthService: AppUserService,
    private appValidationService: AppValidationService
  ) {}

  dialogClose() {
    this.authForm.reset();
    this.dialogRef.close();
  }

  login(): void {
    if (this.authForm.valid) {
      this.authForm.disable();
      const user: User = this.authForm.value;
      this.authSub = this.appAuthService
        .login(user)
        .subscribe((token: any) => this.dialogRef.close());
    }
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    this.authForm.valueChanges.subscribe(() => {
      this.authFormErrors = this.appValidationService.onFormChange(
        this.authForm,
        this.authFormErrors,
        this.validationMessages
      );
    });
  }
}
