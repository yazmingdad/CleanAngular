import { Component, Input } from '@angular/core';
import { Employee } from 'src/app/data/schema/employee';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    ssn: '',
    rankId: 0,
    departmentId: 0,
    activeCardId: 0,
    avatar: '',
    isRetired: false,
  };
}
