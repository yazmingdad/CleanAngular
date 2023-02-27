import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HRRoutingModule } from './hr-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { EmployeeComponent } from './pages/employee/employee/employee.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent, EmployeeListComponent, EmployeeComponent],
  imports: [CommonModule, HRRoutingModule, SharedModule],
})
export class HRModule {}
