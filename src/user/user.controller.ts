import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  getUser(@Param('id') id: Types.ObjectId): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<User> {
    return this.userService.create(newUser);
  }

  @Put('/:id')
  updateUser(@Param('id') id: Types.ObjectId, @Body() updatedUser: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updatedUser);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: Types.ObjectId): Promise<User>{
    return this.userService.delete(id);
  }
}
