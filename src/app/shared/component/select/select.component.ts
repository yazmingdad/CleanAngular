import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

interface SelectItem {
  id: number;
  value: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() options: SelectItem[];

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return touched && errors;
  }
}
