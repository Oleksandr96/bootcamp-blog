import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { AppUserService } from '../../../services/user/app-user.service';
import { AppUserMockedService } from '../../../services/user/app-user-mocked.service';
import { MaterialModule } from '../../../shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [{ provide: AppUserService, useClass: AppUserMockedService }],
      imports: [MaterialModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
