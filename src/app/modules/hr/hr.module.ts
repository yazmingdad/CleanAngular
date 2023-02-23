import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HRRoutingModule } from './hr-routing.module';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';

@NgModule({
  declarations: [HomeComponent, EmployeeListComponent],
  imports: [CommonModule, HRRoutingModule],
})
export class HRModule {}
