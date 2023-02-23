import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.checkAuth().subscribe({
      next: () => {
        this.router.navigateByUrl('/hr');
      },
      error: (err) => {
        this.router.navigateByUrl('/signin');
      },
    });
  }
}
