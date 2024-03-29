import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  isLoading = true;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.checkAuth().subscribe({
      next: (loggedInUser) => {
        //this.router.navigateByUrl('/hr/employee/up');
        console.log('loggedInUser from welcome', loggedInUser);
        if (loggedInUser) {
          if (loggedInUser.isFirstLogin) {
            this.router.navigateByUrl('/reset');
          } else {
            //this.router.navigateByUrl('/hr/employee/up');
            //this.router.navigateByUrl('/');
            this.isLoading = false;
          }
        } else {
          this.router.navigateByUrl('/signin');
        }
      },
      error: (err) => {
        this.router.navigateByUrl('/signin');
      },
    });
  }
}
