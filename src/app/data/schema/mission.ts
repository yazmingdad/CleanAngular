import { City } from './city';
import { Department } from './department';
import { EmployeeBrief } from './employee';
import { Priority } from './priority';
import { Status } from './status';

export interface Mission {
  id: number;
  code: string;
  department: string;
  status: string;
  startCity: string;
  byUser: string;
  priority: string;
  title: string;
  description: string;
  budget: number;
  cost: number;
  startDate: Date;
  endDate: Date;
  creationDate: Date;
  isInCountry: boolean;
}

export interface MissionCard {
  id: number;
  title: string;
  code: string;
  description: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
  status: Status;
  department: Department;
  startCity: City;
  priority: Priority;
  budget: number;
  cost: number;
  distance: number;
  isInCountry: boolean;
  participants: EmployeeBrief[];
  destinations: City[];
}

export interface MissionPost {
  title: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  departmentId: number;
  startCityId: number;
  priority: number;
  budget: number;
  isInCountry: boolean;
  participants: number[];
  destinations: number[];
}
