// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './update-user.dto';
import { ConflictException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User | null> {
    console.log(user);

    let existingUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      throw new ConflictException(
        ' User with the provided email already exists ',
      );
    }
  
    return await this.userRepository.save(user);
  }

  async getUser(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getOrAddUser(user: User): Promise<User> {
    console.log('service: ' + user);
    const foundUser = await this.getUser(user.email);
    if (foundUser) {
        return foundUser;
    }
    return await this.create(user);
  }


  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUser(email, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    if (email != updateUserDto.email) {
      const existingUser = await this.userRepository.findOne({
        where: {
          email: updateUserDto.email,
        },
      });

      if (existingUser) {
        throw new ConflictException(
          ' User with the provided email already exists ',
        );
      }
    }

    const user: User = await this.getUser(email);
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    user.role = updateUserDto.role;
    return await this.userRepository.save(user);
  }

  async deleteUser(email: string) {
    return this.userRepository.delete({ email });
  }

  
  async updateRefreshToken(email: string, refreshToken: string) {
    console.log("service")
    console.log(email);
    console.log(refreshToken);
    const user: User = await this.getUser(email);
    console.log(user);
    user.refreshToken = refreshToken;
    console.log(user);
    await this.userRepository.save(user);
  }
}
