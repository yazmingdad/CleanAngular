import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PasswordSet } from 'src/app/data/schema/user';
import { UserService } from 'src/app/data/service/user/user.service';
import { MatchPassword } from 'src/app/shared/validator/match-password';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
  providers: [UserService],
})
export class ResetComponent {
  isFirstLogin: boolean = false;
  resetForm = new FormGroup(
    {
      oldPassword: new FormControl(''),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.{8,16})[A-Za-z0-9!@#$%^&*()_+]{8,16}$/
        ),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.{8,16})[A-Za-z0-9!@#$%^&*()_+]{8,16}$/
        ),
        Validators.maxLength(20),
      ]),
    },
    {
      validators: [this.matchPassword.validate],
    }
  );
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private matchPassword: MatchPassword
  ) {
    console.log('new instance reset password', Math.random());
  }

  ngOnInit() {
    this.authService.loggedIn$.subscribe((loggedInUser) => {
      console.log('loggedinUser ', loggedInUser);

      if (loggedInUser) {
        this.isFirstLogin = loggedInUser.isFirstLogin ?? false;

        if (!this.isFirstLogin) {
          this.resetForm.controls['oldPassword'].addValidators([
            Validators.required,
          ]);
        }
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      console.log('invalid form', this.resetForm.value);
      return;
    }
    console.log('password reset', this.resetForm.value);

    const payload = this.resetForm.value as PasswordSet;

    this.userService.changePassword(payload).subscribe(() => {
      this.router.navigateByUrl('/hr/employee/up');
    });
  }
}
