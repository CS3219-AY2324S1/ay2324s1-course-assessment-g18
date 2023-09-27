// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  userEmail: string;

  @Column()
  userRole: UserRole;
}
