import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUserService } from '../../../services/app-user.service';
import { User } from '../../../interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'status'];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private appUserService: AppUserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.appUserService.getAll().subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeRole($event: MatSlideToggleChange, id: string) {
    console.log($event.checked);
    this.appUserService
      .update({ _id: id, isAdmin: $event.checked })
      .subscribe((data) => {
        this.snackBar.open('Role changed!', 'Ok');
      });
  }
}
