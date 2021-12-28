import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AppPostsService } from '../../services/app-posts.service';
import { Post } from '../../interfaces/post.interface';

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

  constructor(
    public dialogRef: MatDialogRef<PostFormComponent>,
    private appPostsService: AppPostsService
  ) {}

  dialogClose() {
    this.newPostForm.reset();
    this.dialogRef.close();
  }

  submit(): void {
    if (this.newPostForm.valid) {
      const post: Post = this.newPostForm.value;
      this.appPostsService.addPost(post);
      this.newPostForm.reset();
      this.dialogRef.close();
    }
  }

  onFormChange() {
    if (this.newPostForm.valid) {
      this.newPostFormErrors = [];
      return;
    }
    const form = this.newPostForm;
    Object.keys(form.controls).forEach((formField) => {
      this.newPostFormErrors[formField] = '';
      const controlErrors: ValidationErrors = form.get(formField)!.errors!;
      if (controlErrors && form.get(formField)?.dirty) {
        Object.keys(controlErrors).forEach((keyError) => {
          this.newPostFormErrors[formField] =
            this.validationMessages[formField][keyError];
        });
      }
    });
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

    this.newPostForm.valueChanges.subscribe((x) => this.onFormChange());
  }
}
