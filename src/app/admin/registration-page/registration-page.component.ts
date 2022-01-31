import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AppValidationService } from '../../services/validation/app-validation.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { AppUserService } from '../../services/user/app-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  registerForm!: FormGroup;
  passwordHide: boolean = true;
  registerFormErrors: any = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  };

  authSub!: Subscription;
  loggedIn: boolean = false;

  validationMessages: any = {
    firstName: {
      required: 'Field required',
      minlength: 'The minimum field length is 3 characters.',
    },
    lastName: {
      required: 'Field required',
      minlength: 'The minimum field length is 3 characters.',
    },
    email: {
      required: 'Field required',
      email: 'Wrong e-mail address',
    },
    password: {
      required: 'Field required',
      minlength: 'The minimum field length is 8 characters.',
    },
  };

  constructor(
    private appAuthService: AppUserService,
    private appValidationService: AppValidationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }

  ngOnInit(): void {
    this.appAuthService
      .isAuthenticated()
      .subscribe((loggedIn: boolean) => (this.loggedIn = loggedIn));

    if (this.loggedIn) this.router.navigate(['/feed']);

    this.registerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.registerForm.valueChanges.subscribe(
      (x) =>
        (this.registerFormErrors = this.appValidationService.onFormChange(
          this.registerForm,
          this.registerFormErrors,
          this.validationMessages
        ))
    );
  }

  register(): void {
    if (this.registerForm.valid) {
      this.registerForm.disable();
      const user: User = this.registerForm.value;
      this.authSub = this.appAuthService.register(user).subscribe((res) => {
        this.snackBar.open(res.message, 'Ok');
        this.router.navigate(['/feed']);
      });
    }
  }
}
