// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './update-user.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/getUser/:email')
  findOne(@Param('email') email: string): Promise<User | undefined> {
    return this.usersService.getUser(email);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @UseGuards(AccessTokenGuard)
  @Post("/create")
  async create(@Body() user: User): Promise<User | null> {
    console.log("create called");
    return this.usersService.create(user);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:email')
  async deleteUser(@Param('email') email: string) {
    await this.usersService.deleteUser(email);
  }

  @UseGuards(AccessTokenGuard)
  @Put("/update/:email")
  async updateUser(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(email, updateUserDto);
  }

  @Post("/getOrAdd")
  async getOrAddUser(@Body() user: User) {
    return await this.usersService.getOrAddUser(user);
  }
}
