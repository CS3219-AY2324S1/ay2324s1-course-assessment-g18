import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { UserModule } from 'src/users/user.module';

@Module({
    imports: [
            UserModule
    ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
