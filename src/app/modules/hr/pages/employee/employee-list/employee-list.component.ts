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
  numberOfPages: { value: number };

  get notFound() {
    return !this.employees || this.employees.length === 0;
  }

  constructor(private employeeService: EmployeeService) {
    this.employeeService.page$.subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: () => {},
    });
    this.employeeService.numberOfPages$.subscribe({
      next: (value) => {
        this.numberOfPages = { value };
      },
      error: () => {},
    });
  }

  ngOnInit() {
    this.employeeService.refresh();
  }

  search(event: string) {
    this.employeeService.search(event);
  }
  getPage(event: number) {
    this.employeeService.getPage(event);
  }
}
