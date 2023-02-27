import { Injectable } from '@angular/core';
import { Employee } from '../schema/employee';
import { employees } from './fake.data';

@Injectable({
  providedIn: 'root',
})
export class HRService {
  constructor() {}

  getEmployeeAll(isRetired: boolean = false): Employee[] {
    return employees
      .filter((e) => !e.isRetired)
      .filter((e, index) => index < 6);
  }
}
