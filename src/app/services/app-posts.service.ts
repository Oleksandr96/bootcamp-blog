import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppPostsService {
  API_URL: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  public create(post: Post): any {
    return this.http.post<Post>(`${this.API_URL}/posts/`, post);
  }

  public fetch(params: any = {}): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}/posts`, {
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }

  public getById(id: string | null): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/posts/${id}`);
  }

  public like(id: string): Observable<Post> {
    return this.http.patch<Post>(`${this.API_URL}/posts/like/${id}`, {
      id: id,
    });
  }
}
