import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormComponent } from './auth-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';
import { AppUserService } from '../../../services/user/app-user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;
  let dialog: MatDialog;

  let authServiceSpy = jasmine.createSpyObj('AppUserService', ['login']);
  authServiceSpy.login.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthFormComponent],
      providers: [
        { provide: AppUserService, useValue: authServiceSpy },
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
      ],
      imports: [MaterialModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    dialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid email and password length', () => {
    component.authForm.setValue({
      email: 'invalidemail',
      password: '11',
    });
    expect(component.authForm.valid).toEqual(false);
  });
  it('should be valid if form value is valid', () => {
    component.authForm.setValue({
      email: 'bobby@bobby.com',
      password: '123emiwfms',
    });

    expect(component.authForm.valid).toEqual(true);
  });

  it('should allow user to log in', () => {
    const formData = {
      email: 'john@ss.com',
      password: '11111111',
    };
    component.authForm.setValue(formData);
    component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith({
      email: formData.email,
      password: formData.password,
    });

    expect(localStorage.getItem('auth-token')).not.toEqual('');
  });

  it('should initialize Auth Form', () => {
    expect(component.authForm).toBeTruthy();
  });

  it('Auth form invalid when empty', () => {
    expect(component.authForm.valid).toBeFalsy();
  });
});
