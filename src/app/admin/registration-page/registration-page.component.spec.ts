import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPageComponent } from './registration-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppUserService } from '../../services/user/app-user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;

  let authServiceSpy = jasmine.createSpyObj('AppUserService', [
    'register',
    'isAuthenticated',
  ]);
  authServiceSpy.register.and.returnValue(of());
  authServiceSpy.isAuthenticated.and.returnValue(of(false));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationPageComponent],
      providers: [{ provide: AppUserService, useValue: authServiceSpy }],
      imports: [MatSnackBarModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should require valid email and password length', () => {
    component.registerForm.setValue({
      firstName: 'A',
      lastName: 'B',
      email: 'invalid-email',
      password: '11',
    });
    expect(component.registerForm.valid).toEqual(false);
  });

  it('should be valid if form value is valid', () => {
    component.registerForm.setValue({
      firstName: 'Alex',
      lastName: 'Admin',
      email: 'alex@gggg.com',
      password: '111111111',
    });

    expect(component.registerForm.valid).toEqual(true);
  });

  it('should allow user to register', () => {
    const formData = {
      firstName: 'FirstName',
      lastName: 'LastName',
      email: 'john@sss.com',
      password: '11111111',
    };
    component.registerForm.setValue(formData);
    component.register();

    expect(authServiceSpy.register).toHaveBeenCalledWith({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    });
  });
  it('should initialize Register Form', () => {
    expect(component.registerForm).toBeTruthy();
  });
});
