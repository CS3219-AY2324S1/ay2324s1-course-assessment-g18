import { UserRole } from './user-role.enum';
import { IsEnum } from 'class-validator';

export class UpdateUserDto {
  username: string;
  email: string;
  @IsEnum(UserRole)
  role: UserRole;
}
