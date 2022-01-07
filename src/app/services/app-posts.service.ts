import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppPostsService {
  API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public create(post: Post): any {
    return this.http.post<Post>(`${this.API_URL}/posts/`, post);
  }

  public getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}/posts`);
  }

  public getById(id: string | null): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/posts/${id}`);
  }
}
