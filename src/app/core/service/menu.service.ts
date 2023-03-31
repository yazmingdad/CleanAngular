import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface MenuItem {
  index?: number;
  route?: string;
  name: string;
  icon: string;
  color: string;
  menuItems?: MenuItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _isOpen = false;
  private _toggle$: BehaviorSubject<boolean>;
  private _index$: BehaviorSubject<number>;

  show$: Observable<boolean>;
  index$: Observable<number>;
  modules$: Observable<MenuItem[]>;

  constructor(private authService: AuthService) {
    this._toggle$ = new BehaviorSubject<boolean>(false);
    this._index$ = new BehaviorSubject<number>(-1);

    this.show$ = this._toggle$.asObservable();
    this.index$ = this._index$;
    this.modules$ = this.authService.loggedIn$.pipe(
      filter(
        (value) =>
          value !== undefined && value !== null && value.roleNames.length > 0
      ),
      map((value) => value!.roleNames),
      map((roles) => {
        let Menu: MenuItem[] = [];

        const isAdmin = roles.includes('Administrator');
        const isConfig = roles.includes('Config');
        const isMember = roles.includes('Member');

        if (isAdmin || isConfig) {
          if (isAdmin) {
            Menu = [
              {
                index: Date.now(),
                name: 'User Management',
                icon: 'fas fa-sitemap',
                color: 'bg-danger',
                menuItems: [
                  {
                    route: '/hr/employee/up',
                    name: 'Active Employees',
                    icon: 'fas fa-user-check',
                    color: 'bg-success',
                  },
                  {
                    route: '/hr/employee/down',
                    name: 'Retired Employees',
                    icon: 'fas fa-user-check',
                    color: 'bg-danger',
                  },
                ],
              },
            ];
          }
          Menu = [
            ...Menu,
            {
              index: Date.now() + 1000,
              name: 'Human Resources',
              icon: 'fas fa-sitemap',
              color: 'bg-danger',
              menuItems: [
                {
                  route: '/hr/employee/up',
                  name: 'Active Employees',
                  icon: 'fas fa-user-check',
                  color: 'bg-success',
                },
                {
                  route: '/hr/employee/down',
                  name: 'Retired Employees',
                  icon: 'fas fa-user-check',
                  color: 'bg-danger',
                },
              ],
            },
            {
              index: Date.now() + 10000,
              name: 'Structure Management',
              icon: 'fas fa-sitemap',
              color: 'bg-danger',
              menuItems: [
                {
                  route: '/hr/structure',
                  name: 'Structure',
                  icon: 'fas fa-user-check',
                  color: 'bg-success',
                },
                {
                  route: '/hr/department/up',
                  name: 'Active Departments',
                  icon: 'fas fa-user-check',
                  color: 'bg-success',
                },
                {
                  route: '/hr/department/Down',
                  name: 'Disabled Departments',
                  icon: 'fas fa-user-check',
                  color: 'bg-danger',
                },
              ],
            },
          ];
        }

        if (isMember) {
          Menu = [
            ...Menu,
            {
              index: Date.now() + 100000,
              name: 'Missions Management',
              icon: 'fas fa-sitemap',
              color: 'bg-danger',
              menuItems: [
                {
                  route: '/hr/employee/up',
                  name: 'Active Employees',
                  icon: 'fas fa-user-check',
                  color: 'bg-success',
                },
                {
                  route: '/hr/employee/down',
                  name: 'Retired Employees',
                  icon: 'fas fa-user-check',
                  color: 'bg-danger',
                },
              ],
            },
          ];
        }

        return Menu;
      })
    );
  }

  toggleMenu() {
    this._isOpen = !this._isOpen;
    this._toggle$.next(this._isOpen);
  }

  expand(index: number) {
    this._index$.next(index);
  }
}
