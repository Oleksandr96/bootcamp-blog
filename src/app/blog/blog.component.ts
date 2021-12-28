import { Component } from '@angular/core';
import { AppPostsService } from '../services/app-posts.service';
import { Post } from '../interfaces/post.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'blog-page',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent {
  posts!: Observable<Post[]>;

  constructor(private appPostsService: AppPostsService) {}

  ngOnInit(): void {
    this.posts = this.appPostsService.getPosts();
  }
}
