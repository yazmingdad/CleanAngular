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

export interface UserPost {
  employeeId: number;
  roleName: string;
}

export interface UserRole {
  userId: string;
  roleName: string;
}

export interface ApplicationUser {
  id: string;
  userName: string;
  fullName: string;
  roles: Role[];
}

export interface PasswordSet {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
