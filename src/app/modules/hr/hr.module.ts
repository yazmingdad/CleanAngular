import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HRRoutingModule } from './hr-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { EmployeeComponent } from './pages/employee/employee/employee.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeFormComponent } from './pages/employee/employee-form/employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentListComponent } from './pages/department/department-list/department-list.component';
import { DepartmentFormComponent } from './pages/department/department-form/department-form.component';
import { DepartmentChartComponent } from './pages/department/department-chart/department-chart.component';
import { DepartmentCardComponent } from './pages/department/department-card/department-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    EmployeeListComponent,
    EmployeeComponent,
    EmployeeFormComponent,
    DepartmentListComponent,
    DepartmentFormComponent,
    DepartmentChartComponent,
    DepartmentCardComponent,
  ],
  imports: [CommonModule, HRRoutingModule, ReactiveFormsModule, SharedModule],
})
export class HRModule {}
