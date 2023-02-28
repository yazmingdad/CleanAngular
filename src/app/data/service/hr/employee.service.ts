import { Injectable } from '@angular/core';
import { Observable, Subject, merge, throwError } from 'rxjs';

import { catchError, switchMap, tap } from 'rxjs/operators';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import { Paginator } from 'src/app/shared/utility/paginator';
import { Employee } from '../../schema/employee';
import { employees } from '../fake.data';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private paginator = new Paginator<Employee>();

  private employees: Employee[] = [];

  get numberOfPages$() {
    return this.paginator.numberOfPages$;
  }

  get page$() {
    return this.paginator.output$;
  }

  constructor(private notificationService: NotificationsService) {}

  private getAll(isRetired: boolean = false) {
    return new Observable<Employee[]>((observer) => {
      observer.next(employees.filter((e) => !e.isRetired));
      observer.complete();
    }).pipe(
      tap(() => this.notificationService.addSuccess('Fetching Employees done')),
      catchError((err) => {
        this.notificationService.addError('Fetching Employees failed');
        return throwError(() => new Error('Fetching Employees failed'));
      })
    );
  }

  private getPageSize() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      return 6;
    }
    return 2;
  }

  refresh() {
    this.getAll().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.paginator.setup({
          list: employees,
          pageSize: this.getPageSize(),
        });
      },
    });
  }

  getPage(page: number) {
    this.paginator.getPage(page);
  }

  search(query: string) {
    query = query.toLowerCase();
    const list = this.employees.filter(
      (e) =>
        e.fullName.toLowerCase().includes(query) ||
        e.department.toLowerCase().includes(query) ||
        e.rank.toLowerCase().includes(query) ||
        e.cardNumber.toLowerCase().includes(query) ||
        e.ssn.toLowerCase().includes(query)
    );

    this.paginator.setup({
      list,
      pageSize: this.getPageSize(),
    });
  }
}
