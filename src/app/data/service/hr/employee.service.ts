import { Injectable } from '@angular/core';
import { EMPTY, iif, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import { Paginator } from 'src/app/shared/utility/paginator';
import {
  EmployeeCard,
  EmployeePatch,
  EmployeePost,
} from '../../schema/employee';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  cardEndpoint,
  employeeEndpoint,
} from 'src/app/core/constants/endpoints';
import { Loading } from 'src/app/shared/utility/loading';
import { CleanResponse } from '../../schema/response';

@Injectable()
export class EmployeeService {
  private paginator = new Paginator<EmployeeCard>();

  private employees: EmployeeCard[] = [];

  get numberOfPages$() {
    return this.paginator.numberOfPages$;
  }

  get page$() {
    return this.paginator.page$;
  }

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {
    console.log('new instance');
  }

  private getAll(isRetired: boolean = false) {
    const params = new HttpParams().set('isRetired', isRetired);
    return this.http.get<EmployeeCard[]>(employeeEndpoint, { params });
  }

  private setList(list: EmployeeCard[]) {
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

  update(payload: EmployeePatch) {
    if (payload.id) {
      return iif(
        () => payload.card !== undefined,
        this.http.post<CleanResponse>(cardEndpoint, payload.card).pipe(
          tap((response) => {
            if (!response.id || response.isFailure || response.id === 0) {
              throw new Error('Card Update failed');
            }
            payload.patches.push({
              path: '/activeCardId',
              op: 'add',
              value: response.id.toString(),
            });
            this.notificationService.addSuccess('New Card Added');
          }),
          switchMap(() =>
            this.http.patch(
              `${employeeEndpoint}/${payload.id}`,
              payload.patches
            )
          )
        ),
        this.http.patch(`${employeeEndpoint}/${payload.id}`, payload.patches)
      ).pipe(
        tap(() => this.notificationService.addSuccess('Successful Update')),
        catchError((err) => {
          let error = err.error as CleanResponse;
          this.notificationService.addError(error.reason);
          return throwError(() => new Error(''));
        })
      );
    }

    return throwError(() => new Error('Id is undefined'));
  }

  insert(payload: EmployeePost) {
    return this.http.post(employeeEndpoint, payload).pipe(
      tap(() => {
        this.notificationService.addSuccess('Employee Added successfully');
      }),
      catchError((err) => {
        let error = err.error as CleanResponse;

        if (!error) {
          error = {
            reason: 'Employee Insert Failed',
          };
        }
        console.log(error.reason);
        this.notificationService.addError(error.reason);
        return throwError(() => new Error(''));
      })
    );
  }

  search(query: string) {
    query = query.toLowerCase();
    const list = this.employees.filter(
      (e) =>
        e.fullName.toLowerCase().includes(query) ||
        e.department.name.toLowerCase().includes(query) ||
        e.rank.name.toLowerCase().includes(query) ||
        e.activeCard?.number.toLowerCase().includes(query) ||
        e.ssn.toLowerCase().includes(query)
    );
    this.setList(list);
  }
}
