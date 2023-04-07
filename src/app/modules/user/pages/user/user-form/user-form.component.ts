import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/data/schema/user';
import { Selectable } from 'src/app/shared/utility/select';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  userForm: FormGroup;
  @Input() test: Selectable<number>[] = [
    {
      id: 1,
      value: 'RERE',
    },
  ];
  @Input() user: User | null;

  ngOnInit() {
    console.log('id', Math.random());
    this.initForm();
  }

  private initForm() {
    let user;

    if (this.user) {
      user = this.user;
    } else {
      user = {
        id: 0,
        employeeId: '',
        shortName: '',
        departmentTypeId: null,
        parentId: null,
        managerId: null,
        cityId: null,
        isDown: false,
      };
    }

    // const { name, shortName, departmentTypeId, parentId, managerId, cityId } =
    //   department;

    // console.log('init', department);

    // this.departmentForm = new FormGroup({
    //   name: new FormControl(name, [
    //     Validators.required,
    //     Validators.minLength(8),
    //     Validators.maxLength(30),
    //   ]),
    //   shortName: new FormControl(shortName, [
    //     Validators.required,
    //     Validators.minLength(2),
    //     Validators.maxLength(10),
    //   ]),
    //   departmentTypeId: new FormControl(departmentTypeId, [
    //     Validators.required,
    //   ]),
    //   parentId: new FormControl(parentId, [Validators.required]),
    //   managerId: new FormControl(managerId, [Validators.required]),
    //   cityId: new FormControl(cityId, [Validators.required]),
    // });
  }

  onSubmit() {}
  getControl(name: string) {
    return this.userForm.get(name) as FormControl;
  }
}
