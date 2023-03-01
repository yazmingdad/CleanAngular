import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import { Paginator } from 'src/app/shared/utility/paginator';
import { Employee } from '../../schema/employee';
import { employees } from '../fake.data';

@Injectable()
export class EmployeeService {
  private paginator = new Paginator<Employee>();

  private employees: Employee[] = [];

  get numberOfPages$() {
    return this.paginator.numberOfPages$;
  }

  get page$() {
    return this.paginator.page$;
  }

  constructor(private notificationService: NotificationsService) {
    console.log('new instance');
  }

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

  private setList(list: Employee[]) {
    this.paginator.list = list;
  }

  setPageSize(pageSize: number) {
    this.paginator.pageSize = pageSize;
  }

  getPage(page: number) {
    this.paginator.getPage(page);
  }

  load() {
    this.getAll().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.setList(employees);
      },
    });
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
    this.setList(list);
  }
}
