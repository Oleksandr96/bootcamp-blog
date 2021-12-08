import { Component } from '@angular/core';
import { AppPostsService } from '../services/app-posts.service';
import { Post } from '../interfaces/post.interface';

@Component({
  selector: 'blog-page',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent {
  posts: Post[] = [];

  constructor(private appPostsService: AppPostsService) {
    this.posts = this.appPostsService.getPosts();
  }
}
