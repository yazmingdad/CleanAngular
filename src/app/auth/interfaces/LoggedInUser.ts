export interface LoggedInUser {
  id: number;
  username: string;
  roleNames: string[];
  isFirstLogin: boolean;
  isDown: boolean;
}
