import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppPostsService } from '../../services/app-posts.service';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  newPostForm!: FormGroup;

  constructor(private appPostsService: AppPostsService) {}

  submit(): void {
    if (this.newPostForm.valid) {
      const post: Post = this.newPostForm.value;
      this.appPostsService.updatePosts(post);
      this.newPostForm.reset();
    }
  }

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      author: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      text: new FormControl('', [
        Validators.required,
        Validators.minLength(30),
      ]),
    });
  }
}
