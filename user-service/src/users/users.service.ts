// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  
  async create(user: User): Promise<User> {
    console.log(user);
    return await this.userRepository.save(user);
  }

  async getUser(email: string): Promise<User> {
    return await this.userRepository.findOne({where: {email}});
  }

  async updateUser(email: string, _user: User) {
    console.log(_user);
    const user: User = await this.getUser(email);
    user.username = _user.username;
    return await this.userRepository.save(user);
  }

  deleteUser(email: any) {
    return this.userRepository.delete({email});
  }

  
  async updateRefreshToken(email: string, refreshToken: string) {
    console.log("service")
    console.log(email);
    console.log(refreshToken);
    const user: User = await this.getUser(email);
    console.log(user);
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
  }
}
