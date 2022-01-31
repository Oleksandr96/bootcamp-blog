import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Comment } from '../../interfaces/comment.interface';

const COMMENTS: any[] = [
  {
    _id: 'id1',
    content: 'test comment',
    postId: 'pid1',
    user: 'uid',
    date: Date.now(),
    isApproved: true,
  },
  {
    _id: 'id2',
    content: 'test comment2',
    postId: 'pid1',
    user: 'uid',
    date: Date.now(),
    isApproved: false,
  },
];

@Injectable()
export class AppMockedCommentsService {
  newDataAdded = new EventEmitter<string>();

  constructor() {}

  public create(comment: Comment): Observable<Comment> {
    return of(COMMENTS[0]);
  }

  public remove(id: string | undefined): Observable<any> {
    return of({ message: 'Comment removed' });
  }

  public update(comment: Comment): Observable<Comment> {
    return of(COMMENTS[0]);
  }

  public getByPostId(id: string | null): Observable<Comment[]> {
    return of(COMMENTS[0]);
  }

  public getNotApproved(): Observable<Comment[]> {
    return of(COMMENTS[1]);
  }
}
