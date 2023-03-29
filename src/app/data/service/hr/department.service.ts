import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subject,
  throwError,
} from 'rxjs';
import {
  centralDepartmentEndPoint,
  citiesEndPoint,
  departmentEndPoint,
  departmentTypesEndPoint,
  employeeLightEndPoint,
  provincialDepartmentEndPoint,
  regionalDepartmentEndPoint,
} from 'src/app/core/constants/endpoints';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import { Loading } from 'src/app/shared/utility/loading';
import { Paginator } from 'src/app/shared/utility/paginator';
import { Selectable } from 'src/app/shared/utility/select';
import { City } from '../../schema/city';
import {
  Department,
  DepartmentCard,
  DepartmentType,
} from '../../schema/department';
import { Employee, EmployeeCard } from '../../schema/employee';

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

  private getDepartments(type: string) {
    this.loading.show();

    let url = '';
    switch (type) {
      case 'Provincial':
        url = provincialDepartmentEndPoint;
        break;
      case 'Regional':
        url = regionalDepartmentEndPoint;
        break;
      default:
        url = centralDepartmentEndPoint;
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

  load(type: string = 'Central') {
    if (type === 'Provincial') {
      this.getDepartments('Regional').subscribe({
        next: (departments) => {
          const parents = departments.map<Selectable>(({ id, name }) => {
            return { id, value: name };
          });
          this._parents$.next(parents);
        },
      });
    }

    this.getDepartmentTypes().subscribe({
      next: (departementTypes) => {
        const types = departementTypes.map<Selectable>(({ id, name }) => {
          return { id, value: name };
        });
        this._departmentTypes$.next(types);
      },
    });

    this.refresh(type);
  }

  refresh(type: string = 'Central') {
    this.getDepartments(type).subscribe({
      next: (departments) => {
        if (type === 'Central' || type === 'Regional') {
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
        d.parent?.shortName.toLowerCase().includes(query)
    );
    this.setList(list);
  }
}
