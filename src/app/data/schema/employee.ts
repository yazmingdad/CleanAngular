import { Card } from './card';
import { Rank } from './rank';
import { Department } from './department';

export interface Employee {
  id: string;
  fullName: string;
  rank: string;
  department: string;
  cardNumber: string;
  ssn: string;
  avatar: string;
  isRetired: boolean;
}

export interface EmployeeCard {
  id: string;
  fullName: string;
  ssn: string;
  avatar: string;
  rank: Rank;
  activeCard: Card;
  department: Department;
}
