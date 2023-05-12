import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Selectable } from '../../utility/select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Input() label: string;
  @Input() isMultiple = false;
  @Input() placeholder = '';
  @Input() control: FormControl;
  @Input() options: Selectable<number | string>[];
  @Output() change = new EventEmitter<string>();

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return touched && errors;
  }

  changeFn(val: Selectable<number | string>) {
    if (!this.isMultiple) {
      this.change.emit(val.value);
    }
  }
}
