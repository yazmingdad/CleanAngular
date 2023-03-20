import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/data/schema/card';
import {
  Employee,
  EmployeePatch,
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
  @Output() employeePatch = new EventEmitter<EmployeePatch>();

  employeeForm: FormGroup;

  get isCreateForm() {
    return this.employee ? false : true;
  }

  cards: Selectable[] | undefined;

  ngOnInit() {
    console.log('id', Math.random());
    this.initForm();
  }

  ngOnChange() {
    console.log('change');
  }

  private initForm() {
    let employee;

    if (this.employee) {
      employee = this.employee;
      if (this.employee.cards) {
        this.cards = this.employee.cards.map<Selectable>((card) => {
          return { id: card.id as number, value: card.number };
        });
      }
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
      if (this.cards && this.cards.length > 0) {
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

    if (this.isCreateForm) {
      this.employeePost.emit(this.employeeForm.value);
    } else {
      try {
        const payload = this.getPatches();
        this.employeePatch.emit(payload);
      } catch {}
    }
  }

  private getPatches() {
    const payload: EmployeePatch = {
      id: this.employee?.id as number,
      patches: [],
    };

    const {
      firstName,
      lastName,
      ssn,
      rankId,
      cardNumber,
      departmentId,
      activeCardId,
      avatar,
    } = this.employeeForm.value;

    const {
      firstName: firstNameInitial,
      lastName: lastNameInitial,
      ssn: ssnInitial,
      rankId: rankIdInitial,
      departmentId: departmentIdInitial,
      activeCardId: activeCardIdInitial,
      avatar: avatarInitial,
    } = this.employee as Employee;

    if (cardNumber !== '' && !this.employeeForm.controls['cardNumber'].errors) {
      payload.card = {
        employeeId: this.employee?.id as number,
        number: cardNumber,
      };
    }

    if (firstName !== firstNameInitial) {
      payload.patches.push({
        path: '/firstName',
        op: 'add',
        value: firstName,
      });
    }

    if (lastName !== lastNameInitial) {
      payload.patches.push({
        path: '/lastName',
        op: 'add',
        value: lastName,
      });
    }

    if (ssn !== ssnInitial) {
      payload.patches.push({
        path: '/ssn',
        op: 'add',
        value: ssn,
      });
    }

    if (rankId !== rankIdInitial) {
      payload.patches.push({
        path: '/rankId',
        op: 'add',
        value: rankId,
      });
    }

    if (departmentId !== departmentIdInitial) {
      payload.patches.push({
        path: '/departmentId',
        op: 'add',
        value: departmentId,
      });
    }

    if (activeCardId !== activeCardIdInitial && !payload.card) {
      payload.patches.push({
        path: '/activeCardId',
        op: 'add',
        value: activeCardId,
      });
    }

    if (avatar !== avatarInitial) {
      payload.patches.push({
        path: '/avatar',
        op: 'add',
        value: avatar,
      });
    }

    return payload;
  }
}
