import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'src/app/core/service/confirmation.service';
import {
  Permission,
  PermissionService,
} from 'src/app/core/service/permission.service';
import { ApplicationUser, Role } from 'src/app/data/schema/user';
import { UserService } from 'src/app/data/service/user/user.service';
import { media } from 'src/app/shared/utility/media';
import { Selectable } from 'src/app/shared/utility/select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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

  splitScreen = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
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
      this.route.params.subscribe(() => {
        this.userService.load();
      }),
    ];
  }
}
