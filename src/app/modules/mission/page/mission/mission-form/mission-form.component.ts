import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { City } from 'src/app/data/schema/city';
import { MissionPost } from 'src/app/data/schema/mission';
import { DepartmentService } from 'src/app/data/service/hr/department.service';
import { EmployeeService } from 'src/app/data/service/hr/employee.service';
import { LocalizationService } from 'src/app/data/service/localization/localization.service';
import { MissionService } from 'src/app/data/service/mission/mission.service';
import { Selectable } from 'src/app/shared/utility/select';
import { MatchStartEndDate } from 'src/app/shared/validator/match-start-end-date';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css'],
  providers: [DepartmentService, EmployeeService, LocalizationService],
})
export class MissionFormComponent {
  @Input() priorities: Selectable<number>[] = [];
  @Input() cities: City[] = [];
  @Input() employees: Selectable<number>[] = [];
  @Input() departments: Selectable<number>[] = [];

  destinations: City[] = [];
  possibleStartingPoints: Selectable<number>[] = [];
  possibleDestinations: Selectable<number>[] = [];

  @Output() missionPost = new EventEmitter<MissionPost>();

  constructor(private matchStartEndDate: MatchStartEndDate) {}

  ngOnInit() {
    this.possibleStartingPoints = this.cities.map((c) => {
      return {
        id: c.id,
        value: c.name,
      };
    });
  }

  missionForm = new FormGroup(
    {
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
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      participants: new FormControl([], [Validators.required]),
      destinations: new FormControl([], [Validators.required]),
    },
    {
      validators: [this.matchStartEndDate.validate],
    }
  );

  onStartingSelected($event: string) {
    console.log('selection from form', $event);
    const startingPoint = this.cities.find((c) => c.name === $event);
    if (startingPoint) {
      this.destinations = [startingPoint];

      this.possibleDestinations = this.possibleStartingPoints.filter(
        (c) => c.value !== $event
      );
    }
  }

  getControl(name: string) {
    return this.missionForm.get(name) as FormControl;
  }

  onSubmit() {
    if (this.missionForm.invalid) {
      console.log('invalid form', this.missionForm.value);
      return;
    }
    console.log('valid form', this.missionForm.value);
    console.log('submit mission form');

    this.missionPost.emit(this.missionForm.value as MissionPost);
  }
}
