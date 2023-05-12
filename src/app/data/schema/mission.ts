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
