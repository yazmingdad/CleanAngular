import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedInUser } from '../interfaces/LoggedInUser';
import { AuthService, UserCredentials } from '../services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private router: Router) {
    console.log('random', Math.ceil(Math.random() * 1000));
  }

  ngOnInit() {
    localStorage.clear();
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService
      .authenticate(this.authForm.value as UserCredentials)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/hr');
        },
        error: ({ error }) => {
          if (error === 'Wrong Credentials') {
            this.authForm.setErrors({ credentials: true });
          } else {
            this.authForm.setErrors({ unknownError: true });
          }
        },
      });
  }
}
