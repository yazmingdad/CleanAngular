import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService, LoggedInUser } from 'src/app/core/service/auth.service';
import { MenuService } from 'src/app/core/service/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  loggedInUser: LoggedInUser | null = null;

  date = new Date();

  constructor(
    private authService: AuthService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe((loggedInUser) => {
      this.loggedInUser = loggedInUser;
    });
  }

  onLogoClick() {
    this.menuService.toggleMenu();
  }
}
