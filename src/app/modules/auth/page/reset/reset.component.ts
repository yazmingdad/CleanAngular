import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent {
  isFirstLogin: boolean = false;
  resetForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmNewPassword: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private router: Router) {
    console.log('new instance reset password', Math.random());
  }

  ngOnInit() {
    this.authService.loggedIn$.subscribe((loggedInUser) => {
      console.log('loggedinUser ', loggedInUser);

      if (loggedInUser) {
        this.isFirstLogin = loggedInUser.isFirstLogin ?? false;
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  onSubmit() {
    console.log('password reset');
  }
}
