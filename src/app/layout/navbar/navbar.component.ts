import { Component } from '@angular/core';
import { AuthService, LoggedInUser } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  loggedInUser: LoggedInUser | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe((loggedInUser) => {
      this.loggedInUser = loggedInUser;
    });
  }
}
