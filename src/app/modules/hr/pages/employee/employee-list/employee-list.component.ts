import { Component } from '@angular/core';
import { Employee } from 'src/app/data/schema/employee';
import { EmployeeService } from 'src/app/data/service/hr/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employees: Employee[];
  numberOfPages = 15;

  constructor(private employeeService: EmployeeService) {
    this.employees = employeeService.getAll();
    console.log(this.employees);
  }

  search(event: string) {
    console.log('search', event);
  }
  getPage(event: number) {
    console.log('getPage', event);
  }
}
