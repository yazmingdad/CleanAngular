export interface Role {
  id: string;
  name: string;
  isEnabled?: boolean;
}

export interface User {
  id: string;
  employeeId: number;
  role: Role;
}

export interface ApplicationUser {
  id: string;
  userName: string;
  fullName: string;
  roles: Role[];
}
