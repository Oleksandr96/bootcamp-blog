import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AppAuthService {
  API_URL: string = environment.apiURL;
  private token: string | null = null;
  private loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('auth-token');
    this.loggedIn.next(!!this.token);
  }

  public login(user: User): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.API_URL}/auth/login`, user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
          this.loggedIn.next(true);
        })
      );
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/auth/register`, user);
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  getToken(): string {
    return <string>this.token;
  }

  isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    this.loggedIn.next(false);
    this.setToken(null);
    localStorage.clear();
  }
}
