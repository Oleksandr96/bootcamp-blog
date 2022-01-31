import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { User } from '../../interfaces/user.interface';

const TOKEN: string =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXguYnVoYW5lbmtvQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsInVzZXJJZCI6IjYxZGFiNTI3MDc4M2VhZmY1ZDcwM2NhYSIsImlhdCI6MTY0MzU4NDUzNiwiZXhwIjoxNjQzNjcwOTM2fQ.-jucQrFLFqVONhfmL6Opa1dEZ7gqvUPfkxRopV4kLxM';
const USERS: any = [
  {
    firstName: 'Admin',
    lastName: 'Alex',
    email: 'admin@admin.com',
  },
  {
    firstName: 'Admin',
    lastName: 'Mariia',
    email: 'mariia@admin.com',
  },
];

@Injectable()
export class AppUserMockedService {
  private token: string | null = TOKEN;
  private loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1);

  constructor() {
    this.token = TOKEN;
    this.loggedIn.next(!!this.token);
  }

  public login(user: User): Observable<{ token: string }> {
    return of({ token: TOKEN });
  }

  public register(user: User): Observable<any> {
    return of({ message: 'Success' });
  }

  public getUserById(): Observable<User> {
    return of(USERS[0]);
  }

  public getAll(): Observable<User[]> {
    return of(USERS[0]);
  }

  public update(user: any): Observable<any> {
    return of({ message: 'User Updated' });
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  public getToken(): string {
    return <string>this.token;
  }

  public getTokenData(): any {
    return JSON.parse(atob(this.getToken().split('.')[1]));
  }

  public isAdmin(): boolean {
    const token = this.getTokenData();
    return token.isAdmin;
  }

  public isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public logout(): void {
    this.loggedIn.next(false);
    this.setToken(null);
    localStorage.clear();
  }
}
