import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
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
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const modifiedReq = request.clone({
          setHeaders: headersConfig,
        });

        console.log(modifiedReq);

        return next.handle(modifiedReq);
      }
    } catch {}

    return next.handle(request);
  }
}
