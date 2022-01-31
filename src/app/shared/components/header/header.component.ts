import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { AppUserService } from '../../../services/user/app-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(
    public dialog: MatDialog,
    private authService: AppUserService,
    private router: Router
  ) {}

  openAuthDialog() {
    this.dialog.open(AuthFormComponent, {
      width: '500px',
    });
  }

  ngOnInit(): void {
    this.authService
      .isAuthenticated()
      .subscribe((loggedIn: boolean) => (this.loggedIn = loggedIn));
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/feed']);
  }
}
