import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './pages/user/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserCardComponent } from './pages/user/user-card/user-card.component';
import { UserFormComponent } from './pages/user/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, UserCardComponent, UserFormComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule, SharedModule],
})
export class UserModule {}
