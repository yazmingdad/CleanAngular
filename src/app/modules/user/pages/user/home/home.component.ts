import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'src/app/core/service/confirmation.service';
import {
  Permission,
  PermissionService,
} from 'src/app/core/service/permission.service';
import {
  ApplicationUser,
  Role,
  UserPost,
  UserRole,
} from 'src/app/data/schema/user';
import { EmployeeService } from 'src/app/data/service/hr/employee.service';
import { UserService } from 'src/app/data/service/user/user.service';
import { media } from 'src/app/shared/utility/media';
import { Selectable } from 'src/app/shared/utility/select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EmployeeService, UserService],
})
export class HomeComponent {
  private medias = {
    sm$: media(`(max-width: 500px)`),
    md$: media(`(min-width: 501px) and (max-width: 820px)`),
    lg$: media(`(min-width: 821px) and (max-width: 968px)`),
    xl$: media(`(min-width: 969px)`),
  };
  isLoading = true;
  showModal = false;

  get notFound() {
    return !this.users || this.users.length === 0;
  }

  permission: Permission = {
    module: 'users',
    field: 'user',
    canGet: true,
    canPost: true,
    canPatch: true,
  };

  numberOfPages: { value: number };

  roles: Selectable<string>[] = [];
  users: ApplicationUser[] = [];
  employees: Selectable<number>[];
  splitScreen = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private permissionService: PermissionService
  ) {
    this.subscriptions = [
      this.medias.sm$.subscribe(() => {
        this.userService.setPageSize(2);
      }),
      this.medias.md$.subscribe(() => {
        this.userService.setPageSize(4);
      }),
      this.medias.lg$.subscribe(() => {
        this.userService.setPageSize(6);
      }),
      this.medias.xl$.subscribe(() => {
        this.userService.setPageSize(8);
      }),
      this.userService.loading$.subscribe((loading) => {
        this.isLoading = loading;
      }),
      this.userService.page$.subscribe({
        next: (users) => {
          this.users = users;
        },
        error: () => {},
      }),
      this.userService.numberOfPages$.subscribe({
        next: (value) => {
          this.numberOfPages = { value };
        },
        error: () => {},
      }),
      this.userService.roles$.subscribe({
        next: (roles) => {
          this.roles = roles;
        },
        error: () => {},
      }),
      this.employeeService.selection$.subscribe((employees) => {
        console.log('employees', employees);
        this.employees = employees;
      }),
      this.confirmationService.confirmation$.subscribe((value) => {
        if (value !== 'No') {
          this.userService.load();
        }
      }),
      this.route.params.subscribe(() => {
        this.userService.load();
        this.employeeService.getSelection();
      }),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onCreate() {
    console.log('add new');
    //this.user = null;
    this.showModal = true;
  }

  search(event: string) {
    console.log('search', event);
  }

  getPage(event: number) {
    console.log('getPage', event);
    this.userService.getPage(event);
  }

  onPost(event: UserPost) {
    console.log('userPost', event);
    this.userService.insert(event).subscribe({
      next: () => {
        this.userService.refresh();
      },
    });
    this.showModal = false;
  }

  addRole(event: UserRole) {
    console.log('add Role', event);
    const message = `Are you sure you want to enable the role ${event.roleName} for this user`;
    this.confirmationService.confirm(message, this.userService.addRole(event));
  }

  removeRole(event: UserRole) {
    console.log('remove Role', event);
    const message = `Are you sure you want to remove the role ${event.roleName} for this user`;
    this.confirmationService.confirm(
      message,
      this.userService.removeRole(event)
    );
  }

  disableUser(event: string) {
    console.log('disable User', event);
    const message = `Are you sure you want to disable this user`;
    this.confirmationService.confirm(
      message,
      this.userService.disableUser(event)
    );
  }
}
