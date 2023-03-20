import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface MenuItem {
  index?: number;
  route?: string;
  name: string;
  icon: string;
  color: string;
  menuItems?: MenuItem[];
}

export const modules: MenuItem[] = [
  {
    index: 1,
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
    index: 2,
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
  {
    index: 3,
    name: 'Structure Management',
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
    index: 4,
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

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private isMenuOpen = false;
  private _toggle$: BehaviorSubject<boolean>;
  private _index$: BehaviorSubject<number>;

  constructor() {
    this._toggle$ = new BehaviorSubject<boolean>(false);
    this._index$ = new BehaviorSubject<number>(-1);

    this.showMenu$ = this._toggle$;
    this.index$ = this._index$;
  }

  showMenu$: Observable<boolean>;
  index$: Observable<number>;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this._toggle$.next(this.isMenuOpen);
  }

  expand(index: number) {
    this._index$.next(index);
  }
}
