export interface User {
    uId: number;
    username: string;
    email: string;
    role: UserRole;
  }

  export enum UserRole {
    Admin = "Admin",
    User = "User",
  }

