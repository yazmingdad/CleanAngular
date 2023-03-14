import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { departmentEndPoint } from 'src/app/core/constants/endpoints';
import { Department } from '../../schema/department';

@Injectable()
export class DepartmentService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get<Department[]>(departmentEndPoint);
  }
}
