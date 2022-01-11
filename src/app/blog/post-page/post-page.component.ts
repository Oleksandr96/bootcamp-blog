import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../interfaces/post.interface';
import { Observable } from 'rxjs';
import { AppPostsService } from '../../services/app-posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent {
  post!: Post | undefined;

  constructor(
    private appPostsService: AppPostsService,
    private activatedRoute: ActivatedRoute
  ) {}

  getPost(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.appPostsService
      .getById(id)
      .subscribe((post: Post) => (this.post = post));
  }

  ngOnInit(): void {
    this.getPost();
  }
}
