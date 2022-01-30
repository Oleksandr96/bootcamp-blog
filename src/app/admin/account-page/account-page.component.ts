import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AppUserService } from '../../services/app-user.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit, AfterContentChecked {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isAdmin: boolean = false;

  constructor(
    private observer: BreakpointObserver,
    public changeDetectorRef: ChangeDetectorRef,
    private appUserService: AppUserService
  ) {}

  ngOnInit(): void {
    const token = this.appUserService.getTokenData();
    this.isAdmin = token.isAdmin;
  }

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
    this.observer
      .observe(['(max-width: 800px)'])
      .subscribe((res: BreakpointState) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
}
