import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SignoutComponent } from './signout/signout.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    SignoutComponent,
    WelcomeComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
