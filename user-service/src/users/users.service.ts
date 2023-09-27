// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './update-user.dto';

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
    return await this.userRepository.findOne({ where: { email } });
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUser(email, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    const user: User = await this.getUser(email);
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    return await this.userRepository.save(user);
  }

  async deleteUser(email: string) {
    return this.userRepository.delete({ email });
  }
}
