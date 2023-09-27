// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

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

  @Post('/create')
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') questionId: string) {
    await this.usersService.deleteUser(questionId);
  }

  @Put('/update/:email')
  async updateUser(@Param('email') email: string, @Body() user: User) {
    await this.usersService.updateUser(email, user);
  }
}
