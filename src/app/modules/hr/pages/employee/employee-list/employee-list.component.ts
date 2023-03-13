import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee, EmployeeCard } from 'src/app/data/schema/employee';
import { EmployeeService } from 'src/app/data/service/hr/employee.service';
import { media } from 'src/app/shared/utility/media';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeService],
})
export class EmployeeListComponent {
  private medias = {
    sm$: media(`(max-width: 767px)`),
    md$: media(`(min-width: 768px) and (max-width: 1199px)`),
    lg$: media(`(min-width: 1200px)`),
  };

  reset$ = new Subject<boolean>();

  isLoading = true;
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
  employees: EmployeeCard[];
  numberOfPages: { value: number };

  get notFound() {
    return !this.employees || this.employees.length === 0;
  }

  constructor(private employeeService: EmployeeService) {
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
  }

  search(event: string) {
    this.employeeService.search(event);
  }
  getPage(event: number) {
    this.employeeService.getPage(event);
  }

  onCreate = () => {
    console.log('create from employee list');
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
      avatar: `data:image/png;base64,${card.avatar}`,
      isRetired,
    };
    this.showModal = true;
  };

  onDismiss() {
    this.showModal = false;
  }
}
