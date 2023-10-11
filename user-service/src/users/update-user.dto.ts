import { UserRole } from './user-role.enum';

export class UpdateUserDto {
  username: string;
  email: string;
  role: UserRole;
}
