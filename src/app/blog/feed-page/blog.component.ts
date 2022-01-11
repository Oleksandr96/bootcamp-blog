import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppPostsService } from '../../services/app-posts.service';
import { Post } from '../../interfaces/post.interface';
import { Tag } from '../../interfaces/tag.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTagsService } from '../../services/app-tags.service';
import { User } from '../../interfaces/user.interface';

const STEP: number = 1;

@Component({
  selector: 'blog-page',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub!: Subscription;
  tSub!: Subscription;

  offset: number = 0;
  limit: number = 1;

  authorId!: string;
  tagId!: string;

  tag!: Tag;
  author!: User;

  loading: boolean = false;
  reloading: boolean = false;
  noMoreOrders: boolean = false;
  pageTitle: string = 'Feed';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private appPostsService: AppPostsService,
    private appTagsService: AppTagsService
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.reloading = true;
    this.fetch();
  }

  ngOnDestroy(): void {
    this.pSub.unsubscribe();
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
        this.noMoreOrders = posts.length < STEP;
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
