import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss'],
})
export class CommentsFormComponent implements OnInit {
  commentForm!: FormGroup;
  commentFormErrors: any = {
    content: null,
  };

  constructor() {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      content: new FormControl('', [Validators.required]),
    });
  }

  submit() {}
}
