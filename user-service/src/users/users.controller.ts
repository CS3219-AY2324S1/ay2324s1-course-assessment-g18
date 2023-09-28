// users.controller.ts
import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/getUser/:email')
  findOne(@Param('email') email: string): Promise<User | undefined> {
    return this.usersService.getUser(email);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @MessagePattern({cmd: 'create'})
  @Post("/create")
  async create(@Body() user: User): Promise<User> {
    console.log("create called");
    return this.usersService.create(user);
  }

  @Delete('/:email')
  async deleteUser(@Param('email') email: string) {
      await this.usersService.deleteUser(email);
  }

  @Put('/update/:email')
  async updateUser(@Param('email') email:string, @Body() user: User) {
    await this.usersService.updateUser(email, user);
  }

  @MessagePattern({cmd: 'refresh'})
  async refresh(email: string, refreshToken: string) {
    return await this.usersService.updateRefreshToken(email, refreshToken);
  }
}
