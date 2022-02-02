import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppUserService } from '../../services/user/app-user.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isAdmin: boolean = false;

  constructor(private appUserService: AppUserService) {}

  ngOnInit(): void {
    const token = this.appUserService.getTokenData();
    this.isAdmin = token.isAdmin;
  }
}
