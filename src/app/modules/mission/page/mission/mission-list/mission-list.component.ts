import { Component } from '@angular/core';
import { City } from 'src/app/data/schema/city';
import { MissionPost } from 'src/app/data/schema/mission';
import { missions } from 'src/app/data/service/fake.data';
import { DepartmentService } from 'src/app/data/service/hr/department.service';
import { EmployeeService } from 'src/app/data/service/hr/employee.service';
import { LocalizationService } from 'src/app/data/service/localization/localization.service';
import { MissionService } from 'src/app/data/service/mission/mission.service';
import { Selectable } from 'src/app/shared/utility/select';
import { MatchStartEndDate } from 'src/app/shared/validator/match-start-end-date';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css'],
  providers: [DepartmentService, EmployeeService, LocalizationService],
})
export class MissionListComponent {
  priorities: Selectable<number>[] = [];
  cities: City[] = [];
  employees: Selectable<number>[] = [];
  departments: Selectable<number>[] = [];

  constructor(
    private missionService: MissionService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private localizationService: LocalizationService
  ) {
    this.missionService.priorities$.subscribe((priorities) => {
      console.log('priorities', priorities);
      this.priorities = priorities;
    });
    this.departmentService.parents$.subscribe((departments) => {
      console.log('departments', departments);
      this.departments = departments;
    }),
      this.employeeService.selection$.subscribe((employees) => {
        console.log('participants', employees);
        this.employees = employees;
      }),
      this.localizationService.cities$.subscribe((cities) => {
        console.log('cities', cities);
        this.cities = cities;
      }),
      this.departmentService.load(false);
    this.employeeService.getSelection();
    this.localizationService.getCities();
  }

  missions = missions;
  showModal = false;
  onCreate() {
    this.showModal = true;
    console.log('add new mission');
  }
  onDismiss() {
    this.showModal = false;
  }

  onPostMission($event: MissionPost) {
    console.log('post new mission', $event);
  }
}
