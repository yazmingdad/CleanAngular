import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoggedInUser } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loggedInUser: LoggedInUser | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe((loggedInUser) => {
      this.loggedInUser = loggedInUser;
    });
  }

  ngOnChanges() {
    console.log(this.loggedInUser, 'loggedInUser');
  }
}
