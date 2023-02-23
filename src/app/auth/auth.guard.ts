import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, skipWhile, take, tap } from 'rxjs';
import { LoggedInUser } from './interfaces/LoggedInUser';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.loggedIn$.pipe(
      //skipWhile((value) => value === null),
      map((value) => value !== null),
      take(1),
      tap((authenticated) => {
        console.log('authenticated', authenticated);
        // console.log(route, 'route');
        // console.log(segments, 'segments');
        console.log(this.authService.loggedIn$.value);
        if (!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
