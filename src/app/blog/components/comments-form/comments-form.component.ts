import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppCommentsService } from '../../../services/comments/app-comments.service';
import { Comment } from '../../../interfaces/comment.interface';
import { AppValidationService } from '../../../services/validation/app-validation.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss'],
})
export class CommentsFormComponent implements OnInit, OnDestroy {
  commentForm!: FormGroup;
  commentSub!: Subscription;
  commentFormErrors: any = {
    content: null,
  };
  validationMessages: any = {
    content: {
      required: 'Field required',
      minlength: 'The minimum field length is 10 characters.',
    },
  };

  constructor(
    private appCommentsService: AppCommentsService,
    private appValidationService: AppValidationService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    this.commentForm.valueChanges.subscribe(
      (x) =>
        (this.commentFormErrors = this.appValidationService.onFormChange(
          this.commentForm,
          this.commentFormErrors,
          this.validationMessages
        ))
    );
  }

  ngOnDestroy() {
    if (this.commentSub) this.commentSub.unsubscribe();
  }

  submit(): void {
    if (this.commentForm.valid) {
      let comment: Comment = this.commentForm.value;
      comment.postId = this.activatedRoute.snapshot.params['id'];
      this.appCommentsService.create(comment).subscribe(() => {
        this.appCommentsService.getByPostId(comment.postId);
      });
      this.appCommentsService.newDataAdded.emit();

      this.commentForm.reset();
      this.snackBar.open(
        'Thanks for your comment 🎉 It will be published after moderation.',
        'Close'
      );
    }
  }
}
