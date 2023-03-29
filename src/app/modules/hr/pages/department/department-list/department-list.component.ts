import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConfirmationService } from 'src/app/core/service/confirmation.service';
import {
  Permission,
  PermissionService,
} from 'src/app/core/service/permission.service';
import { Department, DepartmentCard } from 'src/app/data/schema/department';
import { departments } from 'src/app/data/service/fake.data';
import { DepartmentService } from 'src/app/data/service/hr/department.service';
import { EmployeeService } from 'src/app/data/service/hr/employee.service';
import { LocalizationService } from 'src/app/data/service/localization/localization.service';
import { media } from 'src/app/shared/utility/media';
import { Selectable } from 'src/app/shared/utility/select';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
  providers: [DepartmentService, EmployeeService, LocalizationService],
})
export class DepartmentListComponent {
  private medias = {
    sm$: media(`(max-width: 800px)`),
    lg$: media(`(min-width: 801px)`),
  };
  private subscriptions: Subscription[] = [];

  isLoading = true;
  showModal = false;
  nature = 'Regional';

  get notFound() {
    return !this.departments || this.departments.length === 0;
  }

  permission: Permission = {
    module: 'hr',
    field: 'department',
    canGet: true,
    canPost: true,
    canPatch: true,
  };

  numberOfPages: { value: number };
  departments: DepartmentCard[] = departments;

  department: Department | null = null;

  departmentTypes: Selectable[];
  parents: Selectable[];
  managers: Selectable[];
  cities: Selectable[];

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private localizationService: LocalizationService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private permissionService: PermissionService
  ) {
    this.subscriptions = [
      this.medias.sm$.subscribe(() => {
        this.departmentService.setPageSize(2);
      }),
      this.medias.lg$.subscribe(() => {
        this.departmentService.setPageSize(7);
      }),
      this.departmentService.loading$.subscribe((loading) => {
        this.isLoading = loading;
      }),
      this.departmentService.page$.subscribe({
        next: (departments) => {
          this.departments = departments;
        },
        error: () => {},
      }),
      this.departmentService.numberOfPages$.subscribe({
        next: (value) => {
          this.numberOfPages = { value };
        },
        error: () => {},
      }),
      this.confirmationService.confirmation$.subscribe((value) => {
        if (value !== 'No') {
          this.departmentService.refresh(this.nature);
        }
      }),

      this.permissionService.departmentPermission$.subscribe((permission) => {
        if (permission) {
          this.permission = permission;
        }
      }),
      this.departmentService.parents$.subscribe((parents) => {
        console.log('parents', parents);
        this.parents = parents;
      }),
      this.departmentService.departmentTypes$.subscribe((departmentTypes) => {
        console.log('types', departmentTypes);
        this.departmentTypes = departmentTypes;
      }),
      this.employeeService.selection$.subscribe((managers) => {
        console.log('managers', managers);
        this.managers = managers;
      }),
      this.localizationService.cities$.subscribe((cities) => {
        console.log('cities', cities);
        this.cities = cities.map<Selectable>(({ id, name }) => {
          return { id, value: name };
        });
      }),
      this.route.params.subscribe(({ nature }) => {
        if (
          nature === 'Central' ||
          nature === 'Regional' ||
          nature === 'Provincial'
        ) {
          this.nature = nature;
        }
        this.departmentService.load(nature);
        this.employeeService.getSelection();
        this.localizationService.getCities();
      }),
    ];
  }

  ngOnInit() {}

  onCreate() {
    this.department = null;
    this.showModal = true;
  }

  getPage(event: number) {
    this.departmentService.getPage(event);
  }

  search(event: string) {
    this.departmentService.search(event);
  }
}
