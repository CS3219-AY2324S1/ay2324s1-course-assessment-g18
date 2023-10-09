// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  userEmail: string;

  @Column()
  userRole: UserRole;

  @Column({
    type: String,
    nullable: true,
  })
  refreshToken: string | null = null;
}
