import { Injectable } from '@angular/core';
import { AppUserService } from '../../services/user/app-user.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpSentEvent,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(
    private appUserService: AppUserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  loggedIn: boolean = false;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.appUserService
      .isAuthenticated()
      .subscribe((loggedIn: boolean) => (this.loggedIn = loggedIn));
    if (this.loggedIn) {
      req = req.clone({
        setHeaders: {
          Authorization: this.appUserService.getToken(),
        },
      });
    }
    return next.handle(req).pipe(
      catchError((err, caught: any) => {
        if (err.status === 401) {
          this.handleAuthError();
          return of(err);
        }
        throw err;
      })
    );
  }

  private handleAuthError() {
    this.appUserService.logout();
    this.router
      .navigate(['/feed'])
      .then(() => this.snackBar.open('Session expired!', 'Ok'));
  }
}
