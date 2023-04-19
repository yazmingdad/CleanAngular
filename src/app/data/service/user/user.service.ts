import { Injectable } from '@angular/core';
import { ApplicationUser, Role, UserPost, UserRole } from '../../schema/user';
import { Paginator } from 'src/app/shared/utility/paginator';
import { Loading } from 'src/app/shared/utility/loading';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import {
  addRoleEndPoint,
  disableUserEndPoint,
  removeRoleEndPoint,
  resetPasswordEndPoint,
  rolesEndPoint,
  userEndpoint,
  usersEndpoint,
} from 'src/app/core/constants/endpoints';
import { Selectable } from 'src/app/shared/utility/select';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { CleanResponse } from '../../schema/response';

@Injectable()
export class UserService {
  private paginator = new Paginator<ApplicationUser>();
  private _roles$ = new Subject<Selectable<string>[]>();
  private loading = new Loading();

  private users: ApplicationUser[] = [];

  get loading$() {
    return this.loading.loading$;
  }

  get numberOfPages$() {
    return this.paginator.numberOfPages$;
  }

  get page$() {
    return this.paginator.page$;
  }

  get roles$() {
    return this._roles$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {}

  getAll() {
    this.loading.show();
    return this.http.get<ApplicationUser[]>(usersEndpoint);
  }

  private setList(list: ApplicationUser[]) {
    this.paginator.list = list;
  }

  setPageSize(pageSize: number) {
    this.paginator.pageSize = pageSize;
  }

  getPage(page: number) {
    this.paginator.getPage(page);
  }

  private getRoles() {
    return this.http.get<Role[]>(rolesEndPoint);
  }

  load() {
    this.getRoles().subscribe({
      next: (result) => {
        const roles = result.map<Selectable<string>>(({ id, name }) => {
          return { id, value: name };
        });
        this._roles$.next(roles);
      },
    });
    this.refresh();
  }

  refresh() {
    this.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.setList(users);
        this.loading.hide();
      },
      error: (error) => {
        console.log('error', error);
        this.users = [];
        this.setList([]);
        this.loading.hide();
      },
    });
  }

  insert(payload: UserPost) {
    return this.http.post(userEndpoint, payload).pipe(
      tap(() => {
        this.notificationService.addSuccess('User added');
      }),
      catchError((err) => {
        let error = err.error as CleanResponse;

        if (!error) {
          error = {
            reason: 'User Insert Failed',
          };
        }
        console.log(error.reason);
        this.notificationService.addError(error.reason);
        return throwError(() => new Error(''));
      })
    );
  }

  addRole(payload: UserRole) {
    return this.http.post(addRoleEndPoint, payload).pipe(
      tap(() => {
        this.notificationService.addSuccess('Role Added');
      }),
      catchError((err) => {
        this.notificationService.addError('Could not add role');
        return throwError(() => new Error(''));
      })
    );
  }

  removeRole(payload: UserRole) {
    return this.http.post(removeRoleEndPoint, payload).pipe(
      tap(() => {
        this.notificationService.addSuccess('Role Removed');
      }),
      catchError((err) => {
        this.notificationService.addError('Could not remove role');
        return throwError(() => new Error(''));
      })
    );
  }

  disableUser(userId: string) {
    return this.http.post(disableUserEndPoint, { userId }).pipe(
      tap(() => {
        this.notificationService.addSuccess('User Disabled');
      }),
      catchError((err) => {
        this.notificationService.addError('Could not disable User');
        return throwError(() => new Error(''));
      })
    );
  }

  resetPassword(userId: string) {
    return this.http.post(resetPasswordEndPoint, { userId }).pipe(
      tap(() => {
        this.notificationService.addSuccess('Password Reset');
      }),
      catchError((err) => {
        this.notificationService.addError('Could not reset password');
        return throwError(() => new Error(''));
      })
    );
  }
}
