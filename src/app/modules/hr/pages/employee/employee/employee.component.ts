import { Component, Input } from '@angular/core';
import { EmployeeCard } from 'src/app/data/schema/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  @Input() employee: EmployeeCard;
}
