import { NgModule } from '@angular/core';
import { AppPostsService } from '../services/posts/app-posts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FeedComponent } from './feed-page/feed.component';

import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostPageComponent } from './post-page/post-page.component';
import { CommentsFormComponent } from './components/comments-form/comments-form.component';
import { CommentComponent } from './components/comment/comment.component';
import { AppCommentsService } from '../services/comments/app-comments.service';
import { AppValidationService } from '../services/validation/app-validation.service';
import { AppTagsService } from '../services/tags/app-tags.service';

@NgModule({
  declarations: [
    PostCardComponent,
    SidebarComponent,
    FeedComponent,
    PostPageComponent,
    CommentsFormComponent,
    CommentComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MaterialModule,
    RouterModule,
  ],
  providers: [
    AppPostsService,
    AppCommentsService,
    AppValidationService,
    AppTagsService,
  ],
})
export class BlogModule {}
