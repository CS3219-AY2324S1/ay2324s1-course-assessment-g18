
export interface User {
    uId: number;
    username: string;
    userEmail: string;
    userRole: UserRole;
}

export enum UserRole {
    Admin = "Admin",
    User = "User",
}

