import { Component } from '@angular/core';
import { AppPostsService, Post } from './services/app-posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bootcamp-blog';

  posts: Post[] = [];

  constructor(private appPostsService: AppPostsService) {
    this.posts = this.appPostsService.getPosts();
  }
}
