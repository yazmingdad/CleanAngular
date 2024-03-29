import { PatchModel } from 'src/app/core/models/patch';
import { City } from './city';
import { EmployeeBrief, EmployeeCard } from './employee';

export interface DepartmentPatch {
  id: number;
  patches: PatchModel[];
}

export interface DepartmentPost {
  name: string;
  shortName: string;
  departmentTypeId: number;
  parentId: number;
  managerId: number;
  cityId: number;
  isDown: boolean;
}

export interface DepartmentType {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
  shortName: string;
  departmentTypeId?: number;
  parentId?: number;
  managerId?: number;
  cityId?: number;
  isDown?: boolean;
}

export interface DepartmentCard {
  id: number;
  departmentTypeId: number;
  parentId?: number;
  managerId: number;
  cityId: number;
  name: string;
  shortName: string;
  isDown: boolean;
  departmentType: DepartmentType;
  parent?: Department;
  manager: EmployeeBrief;
  city: City;
}
