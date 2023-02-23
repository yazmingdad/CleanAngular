import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css'],
})
export class SignoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.signout().subscribe(() => {
      //Navigate the user back to a signin page
      this.router.navigateByUrl('/');
    });
  }
}
