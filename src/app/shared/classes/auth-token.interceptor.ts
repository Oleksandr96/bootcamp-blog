import { Injectable } from '@angular/core';
import { AppAuthService } from '../../services/app-auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AppAuthService) {}

  loggedIn: boolean = false;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.authService
      .isAuthenticated()
      .subscribe((loggedIn) => (this.loggedIn = loggedIn));
    if (this.loggedIn) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.getToken(),
        },
      });
    }
    return next.handle(req);
  }
}
