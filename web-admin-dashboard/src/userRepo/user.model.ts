export interface User {
    uId: number;
    userName: string;
    userEmail: UserRole;
    userRole: string;
  }

  export enum UserRole {
    Admin = "Admin",
    User = "User",
  }