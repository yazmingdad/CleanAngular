import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Department,
  DepartmentPatch,
  DepartmentPost,
} from 'src/app/data/schema/department';
import { Selectable } from 'src/app/shared/utility/select';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css'],
})
export class DepartmentFormComponent {
  @Input() department: Department | null;
  @Input() parents: Selectable<number>[] = [];
  @Input() departmentTypes: Selectable<number>[] = [];
  @Input() managers: Selectable<number>[] = [];
  @Input() cities: Selectable<number>[] = [];

  @Output() departmentPost = new EventEmitter<DepartmentPost>();
  @Output() departmentPatch = new EventEmitter<DepartmentPatch>();

  departmentForm: FormGroup;

  get isCreateForm() {
    return this.department ? false : true;
  }

  ngOnInit() {
    console.log('id', Math.random());
    this.initForm();
  }

  getControl(name: string) {
    return this.departmentForm.get(name) as FormControl;
  }

  private initForm() {
    let department;

    if (this.department) {
      department = this.department;
    } else {
      department = {
        id: 0,
        name: '',
        shortName: '',
        departmentTypeId: null,
        parentId: null,
        managerId: null,
        cityId: null,
        isDown: false,
      };
    }

    const { name, shortName, departmentTypeId, parentId, managerId, cityId } =
      department;

    console.log('init', department);

    this.departmentForm = new FormGroup({
      name: new FormControl(name, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
      shortName: new FormControl(shortName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
      ]),
      departmentTypeId: new FormControl(departmentTypeId, [
        Validators.required,
      ]),
      parentId: new FormControl(parentId, [Validators.required]),
      managerId: new FormControl(managerId, [Validators.required]),
      cityId: new FormControl(cityId, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.departmentForm.invalid) {
      console.log('invalid form', this.departmentForm.value);
      return;
    }

    if (this.isCreateForm) {
      this.departmentPost.emit(this.departmentForm.value);
    } else {
      try {
        const payload = this.getPatches();
        this.departmentPatch.emit(payload);
      } catch {}
    }
  }

  private getPatches() {
    const payload: DepartmentPatch = {
      id: this.department?.id as number,
      patches: [],
    };

    const { name, shortName, departmentTypeId, parentId, managerId, cityId } =
      this.departmentForm.value;

    const {
      name: nameInitial,
      shortName: shortNameInitial,
      departmentTypeId: departmentTypeIdInitial,
      parentId: parentIdInitial,
      managerId: managerIdInitial,
      cityId: cityIdInitial,
    } = this.department as Department;

    if (name !== nameInitial) {
      payload.patches.push({
        path: '/name',
        op: 'add',
        value: name,
      });
    }

    if (shortName !== shortNameInitial) {
      payload.patches.push({
        path: '/shortName',
        op: 'add',
        value: shortName,
      });
    }

    if (departmentTypeId !== departmentTypeIdInitial) {
      payload.patches.push({
        path: '/departmentTypeId',
        op: 'add',
        value: departmentTypeId,
      });
    }

    if (parentId !== parentIdInitial) {
      payload.patches.push({
        path: '/parentId',
        op: 'add',
        value: parentId,
      });
    }

    if (managerId !== managerIdInitial) {
      payload.patches.push({
        path: '/managerId',
        op: 'add',
        value: managerId,
      });
    }

    if (cityId !== cityIdInitial) {
      payload.patches.push({
        path: '/cityId',
        op: 'add',
        value: cityId,
      });
    }

    return payload;
  }
}
