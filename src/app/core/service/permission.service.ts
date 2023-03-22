import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Permission {
  module: string;
  field: string;
  canGet: boolean;
  canPost: boolean;
  canPatch: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private _permissions$: Observable<Permission[]>;
  constructor(private authService: AuthService) {
    this._permissions$ = this.authService.loggedIn$.pipe(
      filter(
        (value) =>
          value !== undefined && value !== null && value.roleNames.length > 0
      ),
      map((value) => value!.roleNames),
      map((roles) => {
        let permissions = [];

        const isAdmin = roles.includes('Administrator');
        const isConfig = roles.includes('Config');
        const isMember = roles.includes('Member');

        if (isAdmin) {
          permissions.push({
            module: 'users',
            field: 'user',
            canGet: true,
            canPost: true,
            canPatch: true,
          });
        } else {
          permissions.push({
            module: 'users',
            field: 'user',
            canGet: true,
            canPost: false,
            canPatch: false,
          });
        }

        if (isConfig) {
          permissions = [
            ...permissions,
            {
              module: 'hr',
              field: 'employee',
              canGet: true,
              canPost: true,
              canPatch: true,
            },
            {
              module: 'hr',
              field: 'department',
              canGet: true,
              canPost: true,
              canPatch: true,
            },
          ];
        } else {
          permissions = [
            ...permissions,
            {
              module: 'hr',
              field: 'employee',
              canGet: true,
              canPost: false,
              canPatch: false,
            },
            {
              module: 'hr',
              field: 'department',
              canGet: true,
              canPost: false,
              canPatch: false,
            },
          ];
        }

        if (isMember) {
          permissions.push({
            module: 'missions',
            field: 'mission',
            canGet: true,
            canPost: true,
            canPatch: true,
          });
        } else {
          permissions.push({
            module: 'missions',
            field: 'mission',
            canGet: true,
            canPost: false,
            canPatch: false,
          });
        }

        return permissions;
      })
    );
  }

  get employeePermission$() {
    return this._permissions$.pipe(
      map((permissions) =>
        permissions.find(
          (permission) =>
            permission.module === 'hr' && permission.field === 'employee'
        )
      )
    );
  }

  get departmentPermission$() {
    return this._permissions$.pipe(
      map((permissions) =>
        permissions.find(
          (permission) =>
            permission.module === 'hr' && permission.field === 'department'
        )
      )
    );
  }

  get userPermission$() {
    return this._permissions$.pipe(
      map((permissions) =>
        permissions.find(
          (permission) =>
            permission.module === 'users' && permission.field === 'user'
        )
      )
    );
  }

  get missionPermission$() {
    return this._permissions$.pipe(
      map((permissions) =>
        permissions.find(
          (permission) =>
            permission.module === 'mission' && permission.field === 'mission'
        )
      )
    );
  }
}
