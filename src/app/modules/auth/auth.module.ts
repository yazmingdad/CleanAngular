import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './page/signin/signin.component';
import { SignupComponent } from './page/signup/signup.component';
import { SignoutComponent } from './page/signout/signout.component';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResetComponent } from './page/reset/reset.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    SignoutComponent,
    WelcomeComponent,
    ResetComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
