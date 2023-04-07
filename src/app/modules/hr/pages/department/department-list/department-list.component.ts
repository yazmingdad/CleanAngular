import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConfirmationService } from 'src/app/core/service/confirmation.service';
import {
  Permission,
  PermissionService,
} from 'src/app/core/service/permission.service';
import {
  Department,
  DepartmentCard,
  DepartmentPatch,
  DepartmentPost,
} from 'src/app/data/schema/department';
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
    md$: media(`(min-width: 801px)`),
  };
  private subscriptions: Subscription[] = [];

  isLoading = true;
  showModal = false;
  isDown = false;

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

  departmentTypes: Selectable<number>[];
  parents: Selectable<number>[];
  managers: Selectable<number>[];
  cities: Selectable<number>[];

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
      this.medias.md$.subscribe(() => {
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
          this.departmentService.refresh(this.isDown);
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
        this.cities = cities.map<Selectable<number>>(({ id, name }) => {
          return { id, value: name };
        });
      }),
      this.route.params.subscribe(({ nature }) => {
        if (nature === 'up') {
          this.isDown = false;
        } else {
          this.isDown = true;
        }
        this.departmentService.load(this.isDown);
        this.employeeService.getSelection();
        this.localizationService.getCities();
      }),
    ];
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onCreate() {
    this.department = null;
    this.showModal = true;
  }

  onEdit = (event: number) => {
    const card = this.departments.find((e) => e.id === event) as DepartmentCard;

    const {
      id,
      name,
      shortName,
      departmentTypeId,
      parentId,
      managerId,
      cityId,
    } = card;

    this.department = {
      id,
      name,
      shortName,
      departmentTypeId,
      parentId,
      managerId,
      cityId,
    };

    this.showModal = true;
  };

  getPage(event: number) {
    this.departmentService.getPage(event);
  }

  search(event: string) {
    this.departmentService.search(event);
  }

  onPost(event: DepartmentPost) {
    this.departmentService.insert(event).subscribe({
      next: () => {
        this.departmentService.refresh(this.isDown);
      },
    });
    this.showModal = false;
  }

  onPatch(event: DepartmentPatch) {
    if (event.patches.length > 0) {
      this.departmentService.update(event).subscribe({
        next: () => {
          this.departmentService.refresh(this.isDown);
        },
      });
    }
    this.showModal = false;
    console.log('patches', event);
  }

  onUpDown(event: number) {
    console.log('updown');
    let message = '';
    const card = this.departments.find((e) => e.id === event) as DepartmentCard;
    if (this.isDown) {
      message = `Are you sure you want to enable ${card.name}?`;
    } else {
      message = `Are you sure you want to disable ${card.name}?`;
    }
    this.confirmationService.confirm(
      message,
      this.departmentService.update({
        id: event,
        patches: [
          {
            path: '/isDown',
            op: 'add',
            value: !this.isDown,
          },
        ],
      })
    );
  }
}
