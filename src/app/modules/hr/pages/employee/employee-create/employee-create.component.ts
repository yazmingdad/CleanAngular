import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/data/schema/employee';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent {
  @Input() reset$: Observable<boolean>;
  ngOnInit() {}

  ngOnChange() {
    console.log('dismiss reached employee create');
  }
}
