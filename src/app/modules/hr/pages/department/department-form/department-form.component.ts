import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/data/schema/department';
import { Selectable } from 'src/app/shared/utility/select';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css'],
})
export class DepartmentFormComponent {
  @Input() department: Department | null;
  @Input() parents: Selectable[] = [];
  @Input() departmentTypes: Selectable[] = [];
  @Input() managers: Selectable[] = [];
  @Input() cities: Selectable[] = [];

  // @Output() departmentPost = new EventEmitter<DepartmentPost>();
  // @Output() departmentPatch = new EventEmitter<DepartmentPatch>();

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
      Name: new FormControl(name, [
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
    console.log('Submit');
    console.log('value', this.departmentForm.value);
  }
}
