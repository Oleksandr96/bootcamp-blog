import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppPostsService } from '../../../services/app-posts.service';
import { Post } from '../../../interfaces/post.interface';
import { AppValidationService } from '../../../services/app-validation.service';

@Component({
  selector: 'app-modal',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  newPostForm!: FormGroup;
  newPostFormErrors: any = {
    author: null,
    title: null,
    content: null,
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
    content: {
      required: 'Field required',
      minlength: 'The minimum field length is 5 characters.',
    },
  };

  constructor(
    public dialogRef: MatDialogRef<PostFormComponent>,
    private appPostsService: AppPostsService,
    private appValidationService: AppValidationService
  ) {}

  dialogClose() {
    this.newPostForm.reset();
    this.dialogRef.close();
  }

  submit(): void {
    if (this.newPostForm.valid) {
      const post: Post = this.newPostForm.value;
      this.appPostsService.create(post);
      this.newPostForm.reset();
      this.dialogRef.close();
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
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });

    this.newPostForm.valueChanges.subscribe((x) =>
      this.appValidationService.onFormChange(
        this.newPostForm,
        this.newPostFormErrors,
        this.validationMessages
      )
    );
  }
}
