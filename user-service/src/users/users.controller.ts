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
import { UpdateUserDto } from './update-user.dto';
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

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @MessagePattern({cmd: 'create'})
  @Post("/create")
  async create(@Body() user: User): Promise<User | null> {
    console.log("create called");
    return this.usersService.create(user);
  }

  @MessagePattern({cmd: 'delete'})
  @Delete('/:email')
  async deleteUser(@Param('email') email: string) {
    await this.usersService.deleteUser(email);
  }

  @Put('/update/:email')
  async updateUser(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(email, updateUserDto);
  }

  @MessagePattern({cmd: 'getOrAdd'})
  async getOrAddUser(@Body() user: User) {
    console.log(user);
    return await this.usersService.getOrAddUser(user);
  }

  @MessagePattern({cmd: 'refresh'})
  async refresh(@Payload() data) {
    const {email, refreshToken} = data;
    console.log(email);
    console.log(refreshToken);
    return await this.usersService.updateRefreshToken(email, refreshToken);
  }
}
