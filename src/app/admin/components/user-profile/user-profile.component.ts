import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppUserService } from '../../../services/app-user.service';
import { AppValidationService } from '../../../services/app-validation.service';
import { User } from '../../../interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordHide: boolean = true;
  formDisabled: boolean = true;
  user!: User;

  profileFormErrors: any = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  };

  validationMessages: any = {
    firstName: {
      required: 'Field required',
      minlength: 'The minimum field length is 3 characters.',
    },
    lastName: {
      required: 'Field required',
      minlength: 'The minimum field length is 3 characters.',
    },
    bio: {
      minlength: 'The minimum field length is 10 characters.',
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
    private appUserService: AppUserService,
    private appValidationService: AppValidationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      bio: new FormControl('', Validators.minLength(10)),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.profileForm.disable();
    this.appUserService.getUserById().subscribe((user: User) => {
      this.profileForm.patchValue(user);
      this.user = user;
    });

    this.profileForm.valueChanges.subscribe(
      (x) =>
        (this.profileFormErrors = this.appValidationService.onFormChange(
          this.profileForm,
          this.profileFormErrors,
          this.validationMessages
        ))
    );
  }

  toggleForm(): void {
    this.formDisabled ? this.profileForm.enable() : this.profileForm.disable();
    this.formDisabled = !this.formDisabled;
  }

  submit(): void {
    if (this.profileForm.valid) {
      this.profileForm.disable();
      const user: User = this.profileForm.value;
      this.appUserService.update(user).subscribe(
        (res) => {
          this.snackBar.open(res.message, 'Ok');
        },
        (error) => this.snackBar.open(error.message, 'Ok')
      );
    }
  }
}
