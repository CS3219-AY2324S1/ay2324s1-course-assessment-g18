import { UserRole } from './user-role.enum';

export class UpdateUserDto {
  userName: string;
  userEmail: string;
  userRole: UserRole;
}
