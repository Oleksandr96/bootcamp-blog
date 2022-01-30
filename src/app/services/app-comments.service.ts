import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class AppCommentsService {
  API_URL: string = environment.apiURL;
  newDataAdded = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  public create(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.API_URL}/comments/`, comment);
  }

  public remove(id: string | undefined): Observable<any> {
    return this.http.delete<Comment>(`${this.API_URL}/comments/${id}`);
  }

  public update(comment: Comment): Observable<Comment> {
    return this.http.patch<Comment>(
      `${this.API_URL}/comments/${comment._id}`,
      comment
    );
  }

  public getByPostId(id: string | null): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URL}/comments/${id}`);
  }

  public getNotApproved(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URL}/comments/`);
  }
}
