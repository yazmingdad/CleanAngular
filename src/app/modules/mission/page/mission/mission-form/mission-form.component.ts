import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css'],
})
export class MissionFormComponent {
  missionForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
      Validators.maxLength(100),
    ]),
    code: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(400),
    ]),
    startCityId: new FormControl(0, [Validators.required]),
    priority: new FormControl(2, [Validators.required]),
    budget: new FormControl(0, [Validators.required]),
    departmentId: new FormControl(0, [Validators.required]),
    isInCountry: new FormControl(true),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
    participants: new FormControl(null, [Validators.required]),
    destinations: new FormControl(null, [Validators.required]),
  });

  cities = [
    { id: 0, value: 'Rabat' },
    { id: 1, value: 'Casablanca' },
    { id: 2, value: 'Marrakech' },
  ];

  priorities = [
    { id: 0, value: 'High' },
    { id: 1, value: 'Low' },
    { id: 2, value: 'Normal' },
  ];

  employees = [
    { id: 0, value: 'James Kook' },
    { id: 1, value: 'Mary Big' },
    { id: 2, value: 'John Doe' },
  ];

  getControl(name: string) {
    return this.missionForm.get(name) as FormControl;
  }

  onSubmit() {
    if (this.missionForm.invalid) {
      console.log('invalid form', this.missionForm.value);
      return;
    }
    console.log('submit mission form');
  }
}
