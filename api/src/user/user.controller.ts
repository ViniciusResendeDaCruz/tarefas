import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser({ id: parseInt(id) });
  }

  @Post()
  async createUser(@Body() user: Prisma.UserCreateInput) {
    return this.userService.createUser(user);
  }
}
