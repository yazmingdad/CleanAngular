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
  numberOfPages: number;

  constructor(private employeeService: EmployeeService) {
    this.employeeService.page$.subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: () => {},
    });
    this.employeeService.numberOfPages$.subscribe({
      next: (value) => {
        this.numberOfPages = value;
      },
      error: () => {},
    });
  }

  ngOnInit() {
    this.employeeService.getPage(1);
  }

  search(event: string) {
    console.log('search', event);
  }
  getPage(event: number) {
    console.log('getPage', event);
  }
}
