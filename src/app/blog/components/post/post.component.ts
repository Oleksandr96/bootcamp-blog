import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../interfaces/post.interface';
import { AppPostsService } from '../../../services/app-posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;

  constructor(private appPostService: AppPostsService) {}

  ngOnInit(): void {}

  public like(id: string) {
    if (id)
      return this.appPostService
        .like(id)
        .subscribe((post: Post) => (this.post = post));
    return false;
  }
}
