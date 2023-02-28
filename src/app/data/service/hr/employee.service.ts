import { Injectable } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';

import { switchMap, tap } from 'rxjs/operators';
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

  constructor() {
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

  private getAll(isRetired: boolean = false) {
    return new Observable<Employee[]>((observer) => {
      observer.next(
        employees.filter((e) => !e.isRetired).filter((e, index) => index < 6)
      );
    });
  }

  private getPageSize() {
    if (window.matchMedia('(min-width: 1170px)').matches) {
      return 6;
    }
    return 2;
  }

  getPage(page: number) {
    this.paginator.getPage(page);
  }

  search(query: string) {}
}
