import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tag } from '../../../interfaces/tag.interface';
import { AppPostsService } from '../../../services/posts/app-posts.service';
import { AppValidationService } from '../../../services/validation/app-validation.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Post } from '../../../interfaces/post.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  postId!: string;
  postTags: any = [];
  pageTitle: string = 'New Post';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    //uploadUrl: 'http://localhost:3000/api/v1/upload',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    sanitize: false,
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(
    private appPostsService: AppPostsService,
    private appValidationService: AppValidationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['id'];
    if (this.postId) {
      this.appPostsService.getById(this.postId).subscribe((post: Post) => {
        this.postForm.patchValue(post);
        this.postTags = post.tags;
      });
      this.pageTitle = 'Edit post';
    }

    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      tags: new FormControl(''),
      shortDescription: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
  }

  updateTags($event: Tag[]): void {
    const tagsIds = $event.map((tag) => tag._id);
    this.postForm.patchValue({ tags: tagsIds });
  }

  savePost(isDraft: boolean): void {
    if (this.postForm.valid) {
      const post: Post = this.postForm.value;
      post.isDraft = isDraft;

      if (this.postId) {
        post._id = this.postId;
        this.appPostsService.update(post).subscribe((res) => {
          this.snackBar.open(res.message, 'Ok');
        });
      } else
        this.appPostsService.create(post).subscribe((res) => {
          this.snackBar.open(res.message, 'Ok');
          this.router.navigate(['/account/publications']);
        });
    }
  }
}
