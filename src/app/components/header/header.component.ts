import { Component, OnInit } from '@angular/core';
import { PostFormComponent } from '../post-form/post-form.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(PostFormComponent, {
      width: '500px',
    });
  }

  ngOnInit(): void {}
}
