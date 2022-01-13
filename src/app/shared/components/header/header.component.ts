import { Component, OnInit } from '@angular/core';
import { PostFormComponent } from '../post-form/post-form.component';

import { MatDialog } from '@angular/material/dialog';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { AppAuthService } from '../../../services/app-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(public dialog: MatDialog, private authService: AppAuthService) {}

  openPostDialog() {
    this.dialog.open(PostFormComponent, {
      width: '500px',
    });
  }

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

  logout() {
    this.authService.logout();
  }
}
