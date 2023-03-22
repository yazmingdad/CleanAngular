import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    try {
      const token = JSON.parse(localStorage.getItem('token') || '');
      console.log(`Bearer ${token}`);
      if (token) {
        const headersConfig = {
          'Content-Type': 'application/json-patch+json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const modifiedReq = request.clone({
          setHeaders: headersConfig,
        });

        return next.handle(modifiedReq).pipe(
          tap((value) => console.log('interceptor', value)),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 403 || error.status === 401) {
              localStorage.clear();
            }
            return throwError(() => new Error(error.message));
          })
        );
      }
    } catch {}

    return next.handle(request);
    // .pipe(
    //   tap((value) => console.log('interceptor', value)),
    //   catchError((error: HttpErrorResponse) => {
    //     console.log('interceptor', error);
    //     if (error.status === 403 || error.status === 401) {
    //       localStorage.clear();
    //     }
    //     return throwError(() => new Error());
    //   })
    // )
  }
}
