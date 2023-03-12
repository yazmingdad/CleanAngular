import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/data/schema/employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent {
  @Input() reset$: Observable<boolean>;
  @Input() employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    ssn: '',
    rankId: 0,
    departmentId: 0,
    activeCardId: 0,
    isRetired: false,
  };
  @Output() employeeSubmit = new EventEmitter();

  employeeForm: FormGroup;

  get isCreateForm() {
    return this.employee.id === 0;
  }

  ranks = [
    { id: 1, value: 'Technician' },
    { id: 2, value: 'Engineer' },
    { id: 3, value: 'Administrator' },
  ];

  ngOnInit() {
    this.initForm();
    if (this.reset$) {
      this.reset$.subscribe(() => {
        console.log('change from form');
        this.initForm();
      });
    }
  }

  ngOnChange() {
    console.log('change');
  }

  private initForm() {
    const { firstName, lastName, ssn, rankId, departmentId, avatar } =
      this.employee;

    this.employeeForm = new FormGroup({
      firstName: new FormControl(firstName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      lastName: new FormControl(lastName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      ssn: new FormControl(ssn, [
        Validators.required,
        Validators.pattern(/^\d{3}-\d{2}-\d{4}$/),
      ]),
    });

    if (this.isCreateForm) {
      const { firstName, lastName, ssn, rankId, departmentId, avatar } =
        this.employee;
      this.employeeForm.addControl(
        'cardNumber',
        new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/),
        ])
      );
      this.employeeForm.addControl(
        'confirmCardNumber',
        new FormControl('', [Validators.required])
      );

      this.employeeForm.addControl(
        'rankId',
        new FormControl(null, [Validators.required])
      );
      this.employeeForm.addControl(
        'departmentId',
        new FormControl(null, [Validators.required])
      );
      this.employeeForm.addControl(
        'avatar',
        new FormControl('', [Validators.required])
      );
      return;
    }
  }

  getControl(name: string) {
    return this.employeeForm.get(name) as FormControl;
  }

  // requiredFileType(arg0: string): import('@angular/forms').ValidatorFn {
  // throw new Error('Function not implemented.');
  // }

  onSubmit() {}
}
