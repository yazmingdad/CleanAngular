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
  @Input() employee: Employee | null;
  @Output() employeeSubmit = new EventEmitter();

  employeeForm: FormGroup;

  get isCreateForm() {
    return this.employee ? false : true;
  }

  ranks = [
    { id: 1, value: 'Technician' },
    { id: 2, value: 'Engineer' },
    { id: 3, value: 'Administrator' },
  ];

  ngOnInit() {
    console.log('id', Math.random());

    this.initForm();
  }

  ngOnChange() {
    console.log('change');
    // this.initForm();
  }

  private initForm() {
    let employee;

    if (this.employee) {
      employee = this.employee;
    } else {
      employee = {
        id: 0,
        firstName: '',
        lastName: '',
        ssn: '',
        avatar: '',
        rankId: null,
        departmentId: null,
        activeCardId: null,
        isRetired: false,
      };
    }

    const {
      firstName,
      lastName,
      ssn,
      rankId,
      departmentId,
      activeCardId,
      avatar,
    } = employee;

    console.log('init', employee);

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
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/),
      ]),
      rankId: new FormControl(rankId, [Validators.required]),
      departmentId: new FormControl(departmentId, [Validators.required]),
      avatar: new FormControl(avatar, [Validators.required]),
    });

    if (this.isCreateForm) {
      // this.employeeForm.addControl(
      //   'avatar',
      //   new FormControl('', [Validators.required])
      // );
    } else {
      this.employeeForm.addControl(
        'activeCardId',
        new FormControl(activeCardId, [Validators.required])
      );
    }
  }

  getControl(name: string) {
    return this.employeeForm.get(name) as FormControl;
  }

  onSubmit() {}
}
