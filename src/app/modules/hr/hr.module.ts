import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HRRoutingModule } from './hr-routing.module';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee/employee.component';

@NgModule({
  declarations: [HomeComponent, EmployeeListComponent, EmployeeComponent],
  imports: [CommonModule, HRRoutingModule],
})
export class HRModule {}
