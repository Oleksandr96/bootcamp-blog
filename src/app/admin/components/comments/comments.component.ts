import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../interfaces/comment.interface';
import { AppCommentsService } from '../../../services/comments/app-comments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments!: Comment[];

  constructor(
    private appCommentsService: AppCommentsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.appCommentsService
      .getNotApproved()
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      });
  }

  remove(id: string | undefined) {
    this.appCommentsService.remove(id).subscribe((data) => {
      this.snackBar.open(data.message, 'Ok');
      this.ngOnInit();
    });
  }

  approve(comment: Comment) {
    comment.isApproved = true;
    this.appCommentsService.update(comment).subscribe((data) => {
      this.snackBar.open('Approved!', 'Ok');
      this.ngOnInit();
    });
  }
}
