import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppPostsService {
  constructor(private http: HttpClient) {}

  public addPost(post: Post): any {
    this.http
      .post<Post>('http://localhost:3000/api/posts/', post)
      .subscribe((data) => console.log(data));
  }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/api/posts');
  }
}
