import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppPostsService } from '../../../services/app-posts.service';
import { Post } from '../../../interfaces/post.interface';
import { Subscription } from 'rxjs';
import { AppUserService } from '../../../services/app-user.service';

@Component({
  selector: 'app-liked-posts',
  templateUrl: './liked-posts.component.html',
  styleUrls: ['./liked-posts.component.scss'],
})
export class LikedPostsComponent implements OnInit, OnDestroy {
  likedPosts!: Post[];
  postsSub!: Subscription;

  token = this.appUserService.getTokenData();

  constructor(
    private appPostsService: AppPostsService,
    private appUserService: AppUserService
  ) {}

  ngOnInit(): void {
    this.postsSub = this.appPostsService
      .getLikedPosts(this.token.userId)
      .subscribe((posts) => (this.likedPosts = posts));
  }

  unlike(id: string): void {
    this.postsSub = this.appPostsService.like(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnDestroy(): void {
    //this.postsSub.unsubscribe();
  }
}
