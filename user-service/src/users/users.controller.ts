// users.controller.ts
import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @MessagePattern({cmd: 'getUser'})
  @Get('/getUser/:email')
  findOne(@Param('email') paramEmail: string, @Payload() data): Promise<User | undefined> {
    const payloadEmail = data.email;
    const email = paramEmail ?? payloadEmail;
    console.log(paramEmail);
    console.log(payloadEmail);
    console.log(email);
    return this.usersService.getUser(email);
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
  async refresh(@Payload() data) {
    const {email, refreshToken} = data;
    console.log(email);
    console.log(refreshToken);
    return await this.usersService.updateRefreshToken(email, refreshToken);
  }
}
