import { NgModule } from '@angular/core';
import { PostComponent } from './components/post/post.component';
import { AppPostsService } from '../services/app-posts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BlogComponent } from './blog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PostComponent, SidebarComponent, BlogComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [AppPostsService],
  exports: [BlogComponent],
})
export class BlogModule {}
