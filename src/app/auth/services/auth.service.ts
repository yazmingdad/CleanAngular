import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  delay,
  EMPTY,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { LoggedInUser } from '../interfaces/LoggedInUser';

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
  rootUrl = 'https://localhost:7297';

  loggedIn$ = new BehaviorSubject<LoggedInUser | null>(null); // Observable

  constructor(private http: HttpClient) {}

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
      .post<AuthenticatedUser>(
        `${this.rootUrl}/token`,
        body.toString(),
        options
      )
      .pipe(
        tap(({ access_Token }) => {
          localStorage.setItem('token', JSON.stringify(access_Token));
        }),
        switchMap((value) => this.getLoggedInUserInfo(value))
      );
  }

  getLoggedInUserInfo(authenticatedUser: AuthenticatedUser) {
    return this.http.get<LoggedInUser>(`${this.rootUrl}/api/User`).pipe(
      tap((loggedInUser) => {
        this.loggedIn$.next(loggedInUser);
      }),
      catchError(() => {
        localStorage.clear();
        this.loggedIn$.next(null);
        return EMPTY;
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

  // checkAuth() {
  //   try {
  //     const token = JSON.parse(localStorage.getItem('token') || '');
  //     if (token) {
  //       return this.getLoggedInUserInfo({
  //         access_Token: token,
  //         username: '',
  //       });
  //     }
  //   } catch {}

  //   return throwError(() => {
  //     this.loggedIn$.next(null);
  //     const error: any = new Error('Unauthorized');
  //     error.timestamp = Date.now();
  //     return error;
  //   });
  // }

  checkAuth() {
    try {
      const token = JSON.parse(localStorage.getItem('token') || '');
      if (token) {
        return this.getLoggedInUserInfo({
          access_Token: token,
          username: '',
        }).pipe(delay(2000));
      }
    } catch {}

    return throwError(() => {
      this.loggedIn$.next(null);
      const error: any = new Error('Unauthorized');
      error.timestamp = Date.now();
      return error;
    }).pipe(delay(2000));
  }
}
