// users.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '../schema/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<User | undefined> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') questionId: string) {
      await this.usersService.deleteUser(questionId);
  }

    @Put('/:id')
    async editQuestion(@Param("id") questionId: string, @Body() userDto: UserDto) {
        await this.usersService.editUser(id, userDto);
    }
}
