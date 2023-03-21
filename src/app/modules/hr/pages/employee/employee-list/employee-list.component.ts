import { Component } from '@angular/core';
import {
  Employee,
  EmployeeCard,
  EmployeePatch,
  EmployeePost,
} from 'src/app/data/schema/employee';
import { DepartmentService } from 'src/app/data/service/hr/department.service';
import { EmployeeService } from 'src/app/data/service/hr/employee.service';
import { RankService } from 'src/app/data/service/hr/rank.service';
import { media } from 'src/app/shared/utility/media';
import { Selectable } from 'src/app/shared/utility/select';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'src/app/core/service/confirmation.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeService, RankService, DepartmentService],
})
export class EmployeeListComponent {
  private medias = {
    sm$: media(`(max-width: 767px)`),
    md$: media(`(min-width: 768px) and (max-width: 1199px)`),
    lg$: media(`(min-width: 1200px)`),
  };

  isRetired = false;

  ranks: Selectable[];
  departments: Selectable[];

  showModal = false;
  employee: Employee | null = {
    id: 0,
    firstName: '',
    lastName: '',
    ssn: '',
    rankId: 0,
    departmentId: 0,
    activeCardId: 0,
    isRetired: false,
    avatar: '',
  };

  isLoading = true;

  employees: EmployeeCard[];

  numberOfPages: { value: number };

  get notFound() {
    return !this.employees || this.employees.length === 0;
  }

  constructor(
    private employeeService: EmployeeService,
    private rankService: RankService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) {
    this.medias.sm$.subscribe(() => {
      this.employeeService.setPageSize(2);
    });
    this.medias.md$.subscribe(() => {
      this.employeeService.setPageSize(4);
    });
    this.medias.lg$.subscribe(() => {
      this.employeeService.setPageSize(6);
    });

    this.employeeService.page$.subscribe({
      next: (employees) => {
        this.isLoading = false;
        this.employees = employees;
        console.log('employees', employees);
      },
      error: () => {},
    });

    this.employeeService.numberOfPages$.subscribe({
      next: (value) => {
        this.numberOfPages = { value };
      },
      error: () => {},
    });

    this.route.params.subscribe(({ isRetired }) => {
      if (isRetired === 'down') {
        this.isRetired = true;
      } else {
        this.isRetired = false;
      }

      this.isLoading = true;
      this.employeeService.load(this.isRetired);
    });

    this.confirmationService.confirmation$.subscribe((value) => {
      if (value !== 'No') {
        this.employeeService.load(this.isRetired);
      }
    });
  }

  ngOnInit() {
    this.rankService.getAll().subscribe({
      next: (ranks) => {
        this.ranks = ranks.map<Selectable>(({ id, name }) => {
          return { id, value: name };
        });
      },
      error: () => {},
    });

    this.departmentService.getAll().subscribe({
      next: (departments) => {
        this.departments = departments.map<Selectable>(({ id, name }) => {
          return { id, value: name };
        });
      },
      error: () => {},
    });
  }

  search(event: string) {
    this.employeeService.search(event);
  }
  getPage(event: number) {
    this.employeeService.getPage(event);
  }

  onCreate = () => {
    this.employee = null;
    this.showModal = true;
  };

  onEdit = (event: number) => {
    const card = this.employees.find((e) => e.id === event) as EmployeeCard;

    const { id, firstName, lastName, ssn, isRetired, cards } = card;

    this.employee = {
      id,
      firstName,
      lastName,
      ssn,
      rankId: card.rank.id,
      departmentId: card.department.id,
      activeCardId: card.activeCard?.id,
      avatar: `${card.avatar}`,
      isRetired,
      cards,
    };

    this.showModal = true;
  };

  onDismiss() {
    this.showModal = false;
  }

  onPost(event: EmployeePost) {
    this.employeeService.insert(event).subscribe({
      next: () => {
        this.employeeService.load();
        this.showModal = false;
      },
    });
  }

  onPatch(event: EmployeePatch) {
    if (event.card || event.patches.length > 0) {
      this.employeeService.update(event).subscribe({
        next: () => {
          this.employeeService.load(this.isRetired);
        },
      });
    }
    this.showModal = false;
  }

  onUpDown(event: number) {
    // this.employeeService
    //   .update({
    //     id: event,
    //     patches: [
    //       {
    //         path: '/isRetired',
    //         op: 'add',
    //         value: !this.isRetired,
    //       },
    //     ],
    //   })
    //   .subscribe((value) => this.employeeService.load(this.isRetired));

    let message = '';
    const card = this.employees.find((e) => e.id === event) as EmployeeCard;

    if (this.isRetired) {
      message = `Are you sure you want to enable ${card.firstName} ${card.lastName}?`;
    } else {
      message = `Are you sure you want to disable ${card.firstName} ${card.lastName}?`;
    }
    this.confirmationService.confirm(
      message,
      this.employeeService.update({
        id: event,
        patches: [
          {
            path: '/isRetired',
            op: 'add',
            value: !this.isRetired,
          },
        ],
      })
    );
  }
}
