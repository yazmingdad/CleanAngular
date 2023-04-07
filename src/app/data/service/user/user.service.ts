import { Injectable } from '@angular/core';
import { ApplicationUser, Role } from '../../schema/user';
import { Paginator } from 'src/app/shared/utility/paginator';
import { Loading } from 'src/app/shared/utility/loading';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import { rolesEndPoint, usersEndpoint } from 'src/app/core/constants/endpoints';
import { Selectable } from 'src/app/shared/utility/select';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
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
}
