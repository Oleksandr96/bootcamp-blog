import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppPostsService } from '../../services/app-posts.service';
import { Post } from '../../interfaces/post.interface';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  newPostForm!: FormGroup;
  newPostFormSubscription!: Subscription;

  newPostFormErrors: any = {
    author: null,
    title: null,
    text: null,
  };

  validationMessages: any = {
    author: {
      required: 'Field required',
      minlength: 'The minimum field length is 3 characters.',
    },
    title: {
      required: 'Field required',
      minlength: 'The minimum field length is 5 characters.',
    },
    text: {
      required: 'Field required',
      minlength: 'The minimum field length is 5 characters.',
    },
  };

  constructor(private appPostsService: AppPostsService) {}

  submit(): void {
    if (this.newPostForm.valid) {
      const post: Post = this.newPostForm.value;
      this.appPostsService.updatePosts(post);
      this.newPostForm.reset();
    }
  }
  onInputChange() {
    if (!this.newPostForm.valid) {
      Object.keys(this.newPostFormErrors).forEach((field: string) => {
        this.newPostFormErrors[field] = '';
        let formInput = this.newPostForm.get(field);

        if (!formInput!.valid && formInput!.dirty) {
          let errorMessage = this.validationMessages[field];

          Object.keys(formInput?.errors!).forEach((key: string) => {
            if (errorMessage[key]) {
              this.newPostFormErrors[field] = errorMessage[key];
            }
          });
        }
      });
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
        Validators.minLength(5),
      ]),
      text: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
    this.newPostFormSubscription = this.newPostForm.valueChanges
      .pipe(debounceTime(400))
      .subscribe((x) => this.onInputChange());
  }
}
