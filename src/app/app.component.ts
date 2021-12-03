import { Component } from '@angular/core';
import {AppPostsService} from "./services/app-posts.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'bootcamp-blog';

  posts = []


  constructor(private appPostsService: AppPostsService) {
    // @ts-ignore
    this.posts = this.appPostsService.getPosts()
  }

}
