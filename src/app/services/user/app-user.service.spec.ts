import { inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppUserService } from './app-user.service';

describe('User Service', () => {
  let service: AppUserService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AppUserService, HttpClient, HttpHandler],
    }).compileComponents();
    service = TestBed.inject(AppUserService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
  it('should check token exist', () => {
    expect(localStorage.getItem('auth-token')).toBeNull();
  });
});
