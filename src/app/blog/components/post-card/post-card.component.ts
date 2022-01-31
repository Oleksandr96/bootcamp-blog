import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../interfaces/post.interface';
import { AppPostsService } from '../../../services/posts/app-posts.service';
import { AppUserService } from '../../../services/user/app-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post!: Post;
  loggedIn: boolean = false;

  constructor(
    private appPostService: AppPostsService,
    private authService: AppUserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService
      .isAuthenticated()
      .subscribe((loggedIn: boolean) => (this.loggedIn = loggedIn));
  }

  public like(id: string) {
    if (id && this.loggedIn)
      return this.appPostService
        .like(id)
        .subscribe((post: Post) => (this.post = post));
    else {
      return this.snackBar.open('Only registered users can vote!', 'Okay..');
    }
  }
}
