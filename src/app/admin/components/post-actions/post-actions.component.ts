import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.scss'],
})
export class PostActionsComponent implements OnInit {
  @Input() postId!: any;
  @Output() removeEvent = new EventEmitter<string>();

  constructor() {}

  remove(postId: string): void {
    this.removeEvent.next(postId);
  }

  ngOnInit(): void {}
}
