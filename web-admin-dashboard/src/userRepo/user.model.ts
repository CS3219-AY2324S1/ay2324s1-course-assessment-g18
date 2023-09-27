export interface User {
    uId: number;
    userName: string;
    userEmail: string;
    userRole: UserRole;
  }

  export enum UserRole {
    Admin = "Admin",
    User = "User",
  }

