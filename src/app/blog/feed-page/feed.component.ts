import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppPostsService } from '../../services/posts/app-posts.service';
import { Post } from '../../interfaces/post.interface';
import { Tag } from '../../interfaces/tag.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

const STEP: number = 2;

@Component({
  selector: 'feed-page',
  templateUrl: 'feed.component.html',
  styleUrls: ['feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub!: Subscription;
  tSub!: Subscription;

  offset: number = 0;
  limit: number = 2;

  authorId!: string;
  tagId!: string;

  tag!: Tag;
  author!: User;

  loading: boolean = false;
  reloading: boolean = false;
  noMorePosts: boolean = false;
  pageTitle: string = 'Feed';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private appPostsService: AppPostsService
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.reloading = true;
    this.fetch();
  }

  ngOnDestroy(): void {
    if (this.pSub) this.pSub.unsubscribe();
  }

  public fetch(): void {
    let params: any = {
      offset: this.offset,
      limit: this.limit,
    };
    this.authorId = this.activatedRoute.snapshot.queryParams['author'];
    this.tagId = this.activatedRoute.snapshot.queryParams['tag'];

    if (this.authorId) params.author = this.authorId;
    if (this.tagId) params.tag = this.tagId;

    this.pSub = this.appPostsService
      .fetch(params)
      .subscribe((posts: Post[]) => {
        this.posts = this.posts?.concat(posts);
        this.noMorePosts = posts.length < STEP;
        this.loading = false;
        this.reloading = false;
      });
  }

  public loadMore() {
    this.loading = true;
    this.offset += STEP;
    this.fetch();
  }
}
