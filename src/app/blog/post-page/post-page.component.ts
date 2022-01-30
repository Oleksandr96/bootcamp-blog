import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../interfaces/post.interface';
import { Observable } from 'rxjs';
import { AppPostsService } from '../../services/app-posts.service';
import { AppUserService } from '../../services/app-user.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent {
  post!: Post | undefined;
  loggedIn: boolean = false;

  constructor(
    private appPostsService: AppPostsService,
    private activatedRoute: ActivatedRoute,
    private appAuthService: AppUserService
  ) {}

  getPost(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.appPostsService
      .getById(id)
      .subscribe((post: Post) => (this.post = post));
  }

  ngOnInit(): void {
    this.getPost();
    this.appAuthService
      .isAuthenticated()
      .subscribe((loggedIn) => (this.loggedIn = loggedIn));
  }
}
