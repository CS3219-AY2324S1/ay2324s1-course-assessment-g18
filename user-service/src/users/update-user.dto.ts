import { UserRole } from './user-role.enum';

export class UpdateUserDto {
  username: string;
  userEmail: string;
  userRole: UserRole;
}
