import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  iif,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import {
  citiesEndPoint,
  departmentEndPoint,
  departmentTypesEndPoint,
  downDepartmentEndPoint,
  employeeLightEndPoint,
  upDepartmentEndPoint,
} from 'src/app/core/constants/endpoints';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import { Loading } from 'src/app/shared/utility/loading';
import { Paginator } from 'src/app/shared/utility/paginator';
import { Selectable } from 'src/app/shared/utility/select';
import { City } from '../../schema/city';
import {
  Department,
  DepartmentCard,
  DepartmentPatch,
  DepartmentPost,
  DepartmentType,
} from '../../schema/department';
import { Employee, EmployeeCard } from '../../schema/employee';
import { CleanResponse } from '../../schema/response';

@Injectable()
export class DepartmentService {
  private paginator = new Paginator<DepartmentCard>();
  private loading = new Loading();
  private _parents$ = new Subject<Selectable[]>();
  private _departmentTypes$ = new Subject<Selectable[]>();

  private departments: DepartmentCard[] = [];

  get loading$() {
    return this.loading.loading$;
  }

  get numberOfPages$() {
    return this.paginator.numberOfPages$;
  }

  get page$() {
    return this.paginator.page$;
  }

  get parents$() {
    return this._parents$.asObservable();
  }

  get departmentTypes$() {
    return this._departmentTypes$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {
    console.log('new instance');
  }

  getAll() {
    return this.http.get<Department[]>(departmentEndPoint);
  }

  private getDepartmentTypes() {
    return this.http.get<DepartmentType[]>(departmentTypesEndPoint);
  }

  private getDepartments(isDown: boolean = false) {
    this.loading.show();

    let url = upDepartmentEndPoint;

    if (isDown) {
      url = downDepartmentEndPoint;
    }

    return this.http.get<DepartmentCard[]>(url).pipe(
      catchError(() => {
        this.notificationService.addError('Internal Server Error');
        return throwError(() => new Error(''));
      })
    );
  }

  private setList(list: DepartmentCard[]) {
    this.paginator.list = list;
  }

  setPageSize(pageSize: number) {
    this.paginator.pageSize = pageSize;
  }

  getPage(page: number) {
    this.paginator.getPage(page);
  }

  load(isDown: boolean = false) {
    this.getDepartmentTypes().subscribe({
      next: (departementTypes) => {
        const types = departementTypes.map<Selectable>(({ id, name }) => {
          return { id, value: name };
        });
        this._departmentTypes$.next(types);
      },
    });

    this.refresh(isDown);
  }

  refresh(isDown: boolean = false) {
    this.getDepartments(isDown).subscribe({
      next: (departments) => {
        if (!isDown) {
          const parents = departments.map<Selectable>(({ id, name }) => {
            return { id, value: name };
          });
          this._parents$.next(parents);
        }

        this.departments = departments;
        this.setList(departments);
        this.loading.hide();
      },
      error: () => {
        this.departments = [];
        this.setList([]);
        this.loading.hide();
      },
    });
  }

  search(query: string) {
    query = query.toLowerCase();
    const list = this.departments.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.shortName.toLowerCase().includes(query) ||
        d.manager.fullName.toLowerCase().includes(query) ||
        d.city.name.toLowerCase().includes(query) ||
        d.parent?.name.toLowerCase().includes(query) ||
        d.parent?.shortName.toLowerCase().includes(query) ||
        d.departmentType.name.toLowerCase().includes(query)
    );
    this.setList(list);
  }

  insert(payload: DepartmentPost) {
    return this.http.post(departmentEndPoint, payload).pipe(
      tap(() => {
        this.notificationService.addSuccess('Department Added successfully');
      }),
      catchError((err) => {
        let error = err.error as CleanResponse;

        if (!error) {
          error = {
            reason: 'Department Insert Failed',
          };
        }
        console.log(error.reason);
        this.notificationService.addError(error.reason);
        return throwError(() => new Error(''));
      })
    );
  }

  update(payload: DepartmentPatch) {
    if (payload.id) {
      return this.http
        .patch(`${departmentEndPoint}/${payload.id}`, payload.patches)
        .pipe(
          tap(() => this.notificationService.addSuccess('Successful Update')),
          catchError((err) => {
            if (err) {
              console.log(err);

              try {
                let error = err.error as CleanResponse;
                if (error.reason) {
                  this.notificationService.addError(error.reason);
                } else {
                  throw new Error();
                }
              } catch {
                this.notificationService.addError('Error, Try later');
              }
            }

            return EMPTY;
          })
        );
    }

    return throwError(() => new Error('Id is undefined'));
  }
}
