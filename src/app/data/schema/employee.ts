import { Card } from './card';
import { Rank } from './rank';
import { Department } from './department';
import { PatchModel } from 'src/app/core/models/patch';

export interface EmployeePatch {
  id: number;
  patches: PatchModel[];
  card?: Card;
}

export interface EmployeePost {
  firstName: string;
  lastName: string;
  avatar: string;
  ssn: string;
  cardNumber?: string;
  rankId: 0;
  departmentId: 0;
  isRetired: boolean;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  rankId: number;
  departmentId: number;
  activeCardId?: number;
  ssn: string;
  avatar: string;
  isRetired: boolean;
  cards?: Card[];
}

export interface EmployeeCard {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  ssn: string;
  avatar: string;
  isRetired: boolean;
  rank: Rank;
  activeCard?: Card;
  department: Department;
  cards?: Card[];
}

export interface EmployeeBrief {
  id: number;
  fullName: string;
  avatar: string;
}
