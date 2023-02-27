import { Component } from '@angular/core';
import { Employee } from 'src/app/data/schema/employee';
import { HRService } from 'src/app/data/service/hr.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employees: Employee[];
  numberOfPages = 15;

  constructor(private hrService: HRService) {
    this.employees = hrService.getEmployeeAll();
    console.log(this.employees);
  }

  search(event: string) {
    console.log('search', event);
  }
  getPage(event: number) {
    console.log('getPage', event);
  }
}
