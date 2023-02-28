import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, EMPTY } from 'rxjs';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import { tokenEndpoint, userEndpoint } from '../constants/endpoints';
import { NotificationsService } from './notifications.service';

export interface LoggedInUser {
  id: number;
  username: string;
  roleNames: string[];
  isFirstLogin: boolean;
  isDown: boolean;
}

export interface UserCredentials {
  username: string;
  password: string;
}

interface AuthenticatedUser {
  access_Token: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn$ = new BehaviorSubject<LoggedInUser | null>(null); // Observable
  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {}

  authenticate(credentials: UserCredentials) {
    const { username, password } = credentials;

    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };

    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);

    console.log(body.toString());

    return this.http
      .post<AuthenticatedUser>(tokenEndpoint, body.toString(), options)
      .pipe(
        tap(({ access_Token }) => {
          localStorage.setItem('token', JSON.stringify(access_Token));
        }),
        switchMap((value) => this.getLoggedInUserInfo())
      );
  }

  getLoggedInUserInfo() {
    return this.http.get<LoggedInUser>(userEndpoint).pipe(
      tap((loggedInUser) => {
        this.loggedIn$.next(loggedInUser);
        this.notificationService.addSuccess(`Welcome ${loggedInUser.username}`);
      }),
      catchError(() => {
        localStorage.clear();
        this.loggedIn$.next(null);
        this.notificationService.addError('Failed Log in');
        return throwError(() => new Error('Cannot retrieve user info'));
      })
    );
  }

  signout() {
    return new Observable((subscriber) => {
      localStorage.clear();
      this.loggedIn$.next(null);
      subscriber.next();
    });
  }

  checkAuth() {
    return new Observable((observer) => {
      const token = JSON.parse(localStorage.getItem('token') || '');
      if (!token) {
        observer.error();
      }
      observer.next();
    }).pipe(
      switchMap(() => this.getLoggedInUserInfo()),
      delay(2000),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }
}
