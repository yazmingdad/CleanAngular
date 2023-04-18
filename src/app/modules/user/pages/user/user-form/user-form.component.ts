import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserPost } from 'src/app/data/schema/user';
import { Selectable } from 'src/app/shared/utility/select';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  userForm: FormGroup;
  @Input() employees: Selectable<number>[] = [];
  @Input() roles: Selectable<string>[] = [];

  @Output() userPost = new EventEmitter<UserPost>();

  ngOnInit() {
    console.log('id', Math.random());
    this.initForm();
  }

  private initForm() {
    this.userForm = new FormGroup({
      employeeId: new FormControl(null, [Validators.required]),
      roleId: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      console.log('invalid form', this.userForm.value);
      return;
    }

    const { employeeId, roleId } = this.userForm.value;

    const { value } = this.roles.find(
      (r) => r.id === roleId
    ) as Selectable<string>;

    this.userPost.emit({
      employeeId,
      roleName: value,
    });
  }

  getControl(name: string) {
    return this.userForm.get(name) as FormControl;
  }
}
