import { Injectable } from '@angular/core';
import { EMPTY, iif, Observable, Subject, throwError } from 'rxjs';
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
  employeeLightEndPoint,
} from 'src/app/core/constants/endpoints';
import { CleanResponse } from '../../schema/response';
import { Selectable } from 'src/app/shared/utility/select';

@Injectable()
export class EmployeeService {
  private paginator = new Paginator<EmployeeCard>();
  private _selection$ = new Subject<Selectable[]>();

  private employees: EmployeeCard[] = [];

  get numberOfPages$() {
    return this.paginator.numberOfPages$;
  }

  get page$() {
    return this.paginator.page$;
  }

  get selection$() {
    return this._selection$.asObservable();
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

  getSelection() {
    return this.http.get<EmployeeCard[]>(employeeLightEndPoint).subscribe({
      next: (employees) => {
        const managers = employees.map<Selectable>(({ id, fullName }) => {
          return { id, value: fullName };
        });
        this._selection$.next(managers);
      },
    });
  }

  setPageSize(pageSize: number) {
    this.paginator.pageSize = pageSize;
  }

  getPage(page: number) {
    this.paginator.getPage(page);
  }

  load(isRetired: boolean = false) {
    this.getAll(isRetired).subscribe({
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
          if (err) {
            console.log(err);
            if (err.status === 403) {
              this.notificationService.addError('Not authorized Update');
            } else {
              let error = err.error as CleanResponse;

              if (error && error.reason) {
                this.notificationService.addError(error.reason);
              } else {
                this.notificationService.addError('Error, Try later');
              }
            }
          }

          return EMPTY;
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
