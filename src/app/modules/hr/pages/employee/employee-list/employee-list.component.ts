import { Component } from '@angular/core';
import {
  Employee,
  EmployeeCard,
  EmployeePatch,
  EmployeePost,
} from 'src/app/data/schema/employee';
import { Rank } from 'src/app/data/schema/rank';
import { DepartmentService } from 'src/app/data/service/hr/department.service';
import { EmployeeService } from 'src/app/data/service/hr/employee.service';
import { RankService } from 'src/app/data/service/hr/rank.service';
import { media } from 'src/app/shared/utility/media';
import { Selectable } from 'src/app/shared/utility/select';

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
    private departmentService: DepartmentService
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
  }

  ngOnInit() {
    this.employeeService.load();

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

    const { id, firstName, lastName, ssn, isRetired } = card;

    this.employee = {
      id,
      firstName,
      lastName,
      ssn,
      rankId: card.rank.id,
      departmentId: card.department.id,
      activeCardId: 0,
      avatar: `${card.avatar}`,
      isRetired,
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
    console.log('patches', event);
    this.employeeService.update(event).subscribe(() => {
      this.employeeService.load();
      this.showModal = false;
    });
  }
}
