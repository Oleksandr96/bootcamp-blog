import { NgModule } from '@angular/core';
import { PostComponent } from './components/post/post.component';
import { AppPostsService } from '../services/app-posts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BlogComponent } from './blog.component';

@NgModule({
  declarations: [PostComponent, SidebarComponent, BlogComponent],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule],
  providers: [AppPostsService],
  exports: [BlogComponent],
})
export class BlogModule {}
