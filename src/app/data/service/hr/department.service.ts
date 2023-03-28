import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  centralDepartmentEndPoint,
  departmentEndPoint,
  provincialDepartmentEndPoint,
  regionalDepartmentEndPoint,
} from 'src/app/core/constants/endpoints';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import { Loading } from 'src/app/shared/utility/loading';
import { Paginator } from 'src/app/shared/utility/paginator';
import { Department, DepartmentCard } from '../../schema/department';

@Injectable()
export class DepartmentService {
  private paginator = new Paginator<DepartmentCard>();
  private loading = new Loading();

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

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {
    console.log('new instance');
  }

  getAll() {
    return this.http.get<Department[]>(departmentEndPoint);
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
    return this.http.get<DepartmentCard[]>(url);
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
    this.getDepartments(type).subscribe({
      next: (departments) => {
        this.departments = departments;
        this.setList(departments);
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
