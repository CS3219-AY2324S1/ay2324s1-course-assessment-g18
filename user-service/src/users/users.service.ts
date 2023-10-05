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
        userEmail: user.userEmail,
      },
    });

    if (existingUser) {
      throw new ConflictException(
        ' User with the provided email already exists ',
      );
    }

    existingUser = await this.userRepository.findOne({
      where: {
        userName: user.userName,
      },
    });

    if (existingUser) {
      throw new ConflictException(
        ' User with the provided username already exists ',
      );
    }

  
    return await this.userRepository.save(user);
  }

  async getUser(userEmail: string): Promise<User> {
    return await this.userRepository.findOne({ where: { userEmail } });
  }


  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUser(email, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    let existingUser = await this.userRepository.findOne({
      where: {
        userEmail: updateUserDto.userEmail,
      },
    });

    if (existingUser) {
      throw new ConflictException(
        ' User with the provided email already exists ',
      );
    }

    existingUser = await this.userRepository.findOne({
      where: {
        userName: updateUserDto.userName,
      },
    });

    if (existingUser) {
      throw new ConflictException(
        ' User with the provided username already exists ',
      );
    }

    const user: User = await this.getUser(email);
    user.userName = updateUserDto.userName;
    user.userEmail = updateUserDto.userEmail;
    user.userRole = updateUserDto.userRole;
    return await this.userRepository.save(user);
  }

  async deleteUser(userEmail: string) {
    return this.userRepository.delete({ userEmail });
  }

  
  async updateRefreshToken(email: string, refreshToken: string) {
    console.log(refreshToken);
    const user: User = await this.getUser(email);
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
  }
}
