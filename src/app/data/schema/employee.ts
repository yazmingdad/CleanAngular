import { Card } from './card';
import { Rank } from './rank';
import { Department } from './department';

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
}
