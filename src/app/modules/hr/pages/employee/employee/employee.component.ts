import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeCard } from 'src/app/data/schema/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  @Input() employee: EmployeeCard;
  @Input() canEdit: boolean = false;
  @Output() edit = new EventEmitter<number>();
  @Output() upDown = new EventEmitter<number>();
  onEdit() {
    this.edit.emit(this.employee.id);
  }

  onUpDown() {
    this.upDown.emit(this.employee.id);
  }
}
