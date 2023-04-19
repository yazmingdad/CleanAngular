import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './page/signin/signin.component';
import { SignoutComponent } from './page/signout/signout.component';
import { SignupComponent } from './page/signup/signup.component';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { ResetComponent } from './page/reset/reset.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'reset',
    component: ResetComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signout',
    component: SignoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
