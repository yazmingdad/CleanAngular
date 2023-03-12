import { Card } from './card';
import { Rank } from './rank';
import { Department } from './department';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  rankId: number;
  departmentId: number;
  activeCardId?: number;
  ssn: string;
  avatar?: File;
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
