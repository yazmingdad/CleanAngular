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
