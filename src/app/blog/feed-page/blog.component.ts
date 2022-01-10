import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppPostsService } from '../../services/app-posts.service';
import { Post } from '../../interfaces/post.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const STEP: number = 1;

@Component({
  selector: 'blog-page',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub!: Subscription;

  offset: number = 0;
  limit: number = 1;
  author!: string;
  tag!: string;

  loading: boolean = false;
  reloading: boolean = false;
  noMoreOrders: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appPostsService: AppPostsService
  ) {}

  ngOnInit(): void {
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
    this.author = this.activatedRoute.snapshot.queryParams['author'];
    this.tag = this.activatedRoute.snapshot.queryParams['tag'];

    if (this.author) params.author = this.author;
    if (this.tag) params.tag = this.tag;

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
