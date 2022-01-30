import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppUserService } from '../../services/app-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AppUserService, private router: Router) {}

  loggedIn: boolean = false;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkUserPermissions(next);
  }

  checkUserPermissions(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.authService
      .isAuthenticated()
      .subscribe((loggedIn) => (this.loggedIn = loggedIn));

    if (this.loggedIn) {
      const isAdmin = this.authService.isAdmin();
      if (route.data['isAdmin'] && route.data['isAdmin'] != isAdmin) {
        this.router.navigate(['/feed']);
        return of(false);
      }
      return of(true);
    } else {
      this.router.navigate(['/feed']);
      return of(false);
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
}
