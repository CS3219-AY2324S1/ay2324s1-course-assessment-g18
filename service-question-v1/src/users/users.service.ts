// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUser(email: string): Promise<User> {
    return this.userRepository.findOne({where: {email}});
  }

  async updateUser(email, _user) {
    console.log(_user);
    const user: User = await this.getUser(email);
    user.username = _user.username;
    user.password = _user.password;
    this.userRepository.save(user);
  }

  deleteUser(email: any) {
    return this.userRepository.delete({email});
  }
}
