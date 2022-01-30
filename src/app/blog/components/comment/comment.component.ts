import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { AppCommentsService } from '../../../services/app-comments.service';
import { Comment } from '../../../interfaces/comment.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnDestroy {
  comments!: Comment[];
  postId!: string;
  commentsSub!: Subscription;

  constructor(
    private appCommentsService: AppCommentsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.appCommentsService.newDataAdded.subscribe(() => {
      this.getComments();
    });
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.commentsSub = this.appCommentsService
      .getByPostId(this.postId)
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
        console.log(this.comments);
      });
  }

  ngOnDestroy(): void {
    if (this.commentsSub) this.commentsSub.unsubscribe();
  }
}
