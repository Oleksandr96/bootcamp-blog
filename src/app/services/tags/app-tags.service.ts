import { Injectable } from '@angular/core';
import { Tag } from '../../interfaces/tag.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppTagsService {
  API_URL: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  public create(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.API_URL}/tags/`, tag);
  }

  public getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.API_URL}/tags`);
  }

  public getPopular(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.API_URL}/tags/popular`);
  }

  public getById(id: string): Observable<Tag> {
    return this.http.get<Tag>(`${this.API_URL}/tags/${id}`);
  }
}
