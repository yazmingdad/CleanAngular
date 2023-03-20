import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService, LoggedInUser } from 'src/app/core/service/auth.service';
import { NavigationService } from 'src/app/core/service/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  loggedInUser: LoggedInUser | null = null;
  //@Output() toggleMenu = new EventEmitter();

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe((loggedInUser) => {
      this.loggedInUser = loggedInUser;
    });
  }

  onLogoClick() {
    // this.toggleMenu.emit();
    this.navigationService.toggleMenu();
  }
}
