import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch {
  constructor(private authService: AuthService, private router: Router) {}
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.loggedIn$.pipe(
      map((value) => value !== null),
      take(1),
      tap((authenticated) => {
        console.log('authenticated', authenticated);
        console.log(this.authService.loggedIn$.value);
        const test = route;
        if (!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
