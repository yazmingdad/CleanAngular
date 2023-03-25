import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/shared/component/not-found/not-found.component';
import { DepartmentListComponent } from './pages/department/department-list/department-list.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'employee/:isRetired',
        component: EmployeeListComponent,
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'department/:isDown',
        component: DepartmentListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HRRoutingModule {}
