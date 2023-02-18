import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInUser } from './auth/interfaces/LoggedInUser';
import { AuthService } from './auth/services/auth.service';

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

    this.authService.checkAuth().subscribe({
      next: () => this.router.navigateByUrl('/hr'),
      error: (err) => {
        this.router.navigateByUrl('/');
      },
    });
  }

  ngOnChanges() {
    console.log(this.loggedInUser, 'loggedInUser');
  }
}
