import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, 
  @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async partial(@Param('id', ParseIntPipe) id: number, 
  @Body() data: UpdateUserDto) {
    return this.userService.partial(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

}
