import { Component } from '@angular/core';
import { City } from 'src/app/data/schema/city';
import { MissionCard, MissionPost } from 'src/app/data/schema/mission';
import { DepartmentService } from 'src/app/data/service/hr/department.service';
import { EmployeeService } from 'src/app/data/service/hr/employee.service';
import { LocalizationService } from 'src/app/data/service/localization/localization.service';
import { MissionService } from 'src/app/data/service/mission/mission.service';
import { Selectable } from 'src/app/shared/utility/select';

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

  selectedIndex: number = 0;
  selected: MissionCard;
  missions: MissionCard[];

  constructor(
    private missionService: MissionService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private localizationService: LocalizationService
  ) {
    this.missionService.missions$.subscribe((missions) => {
      this.missions = missions;
      this.selected = missions[0];
      console.log('missions', missions);
    });
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
      this.missionService.reload();
    this.departmentService.load(false);
    this.employeeService.getSelection();
    this.localizationService.getCities();
  }

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
    this.missionService.insert($event).subscribe(() => {
      this.showModal = false;
      this.missionService.reload();
    });
  }

  onDetails(id: number) {
    console.log(
      'details',
      this.missions.find((m) => m.id === id)
    );

    this.selectedIndex = id;
    this.selected = this.missions.find((m) => m.id === id) as MissionCard;
  }
}
