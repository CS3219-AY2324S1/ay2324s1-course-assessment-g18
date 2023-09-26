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
    return await this.userRepository.save(user);
  }

  async getUser(email: string): Promise<User> {
    return await this.userRepository.findOne({where: {email}});
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUser(email, _user) {
    console.log(_user);
    const user: User = await this.getUser(email);
    user.username = _user.username;
    user.email = _user.email;
    user.role = _user.role;
    return await this.userRepository.save(user);
  }

  deleteUser(email: any) {
    return this.userRepository.delete({ email });
  }
}
