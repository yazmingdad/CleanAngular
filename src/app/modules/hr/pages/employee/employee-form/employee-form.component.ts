import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Employee,
  EmployeePatches,
  EmployeePost,
} from 'src/app/data/schema/employee';
import { Selectable } from 'src/app/shared/utility/select';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent {
  @Input() employee: Employee | null;
  @Input() ranks: Selectable[] = [];
  @Input() departments: Selectable[] = [];

  @Output() employeePost = new EventEmitter<EmployeePost>();
  @Output() employeePatch = new EventEmitter<EmployeePatches>();

  patches: EmployeePatches = {
    patches: [],
  };

  employeeForm: FormGroup;

  get isCreateForm() {
    return this.employee ? false : true;
  }

  cards = [
    { id: 1, value: '7875 9854 2587 5547' },
    { id: 2, value: '1598 8657 6258 3321' },
    { id: 3, value: '1457 6325 8745 5896' },
  ];

  ngOnInit() {
    console.log('id', Math.random());
    this.initForm();
    this.employeeForm.valueChanges.subscribe((value) => {
      console.log('change', value);
    });
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
        Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/),
      ]),
      rankId: new FormControl(rankId, [Validators.required]),
      departmentId: new FormControl(departmentId, [Validators.required]),
      avatar: new FormControl(avatar, [Validators.required]),
    });

    if (this.isCreateForm) {
      this.employeeForm.controls['cardNumber'].addValidators([
        Validators.required,
      ]);
    } else {
      if (this.cards.length > 0) {
        this.employeeForm.addControl(
          'activeCardId',
          new FormControl(activeCardId, [Validators.required])
        );
      }
    }
  }

  getControl(name: string) {
    return this.employeeForm.get(name) as FormControl;
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      console.log('invalid form', this.employeeForm.value);
      return;
    }
    this.employeePost.emit(this.employeeForm.value);
  }
}
