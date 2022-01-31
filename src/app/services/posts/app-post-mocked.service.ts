import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../../interfaces/post.interface';

const USER: any = {
  firstName: 'Admin',
  lastName: 'Alex',
  email: 'admin@admin.com',
};

const POSTS: any[] = [
  {
    _id: 'qwerty1',
    title: 'Post title',
    user: {
      _id: 'userId',
      firstName: 'Admin',
      lastName: 'Alex',
      avatarSrc: '/uploads/user.png',
    },
    isDraft: false,
    content: 'post content',
    shortDescription: 'short Description',
    date: new Date(),
    likesCount: 5,
  },
  {
    _id: 'qwerty2',
    title: 'Post2 title',
    user: {
      _id: 'userId2',
      firstName: 'Admin2',
      lastName: 'Alex2',
      avatarSrc: '/uploads/user.png',
    },

    isDraft: false,
    content: 'post content2',
    shortDescription: 'short Description2',
    date: new Date(),
    likesCount: 3,
  },
];

@Injectable()
export class AppPostMockedService {
  constructor() {}

  public create(post: Post): Observable<any> {
    return of<any>({ message: 'Post Created' });
  }

  public update(post: Post): Observable<any> {
    return of<any>({ message: 'Post Updated' });
  }

  public fetch(params: any = {}): Observable<Post[]> {
    return of<Post[]>(POSTS);
  }

  public getById(id: string | null): Observable<Post> {
    return of<Post>(POSTS[0]);
  }

  public remove(id: string): Observable<any> {
    return of<any>({ message: 'Post Deleted' });
  }

  public like(id: string): Observable<Post> {
    return of<Post>(POSTS[0]);
  }

  public getLikedPosts(userId: string): Observable<any> {
    return of<Post[]>(POSTS);
  }
}
