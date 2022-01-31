import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../../interfaces/post.interface';
import { AppPostsService } from '../../../services/posts/app-posts.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'date', 'actions'];
  dataSource!: MatTableDataSource<Post>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private appPostsService: AppPostsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.appPostsService
      .fetch({ offset: 0, limit: 0 })
      .subscribe((posts: Post[]) => {
        this.dataSource = new MatTableDataSource(posts);
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

  remove($event: any): void {
    this.appPostsService.remove($event).subscribe((response: any) => {
      this.snackBar.open(response.message, 'Close');
      this.ngOnInit();
    });
  }
}
