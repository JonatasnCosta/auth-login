import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UseInterceptors, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUserDto } from './dto/partial-user.dto';
import { LogInterceptador } from 'src/interceptadors/log-interceptador';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(AuthGuard)
@UseInterceptors(LogInterceptador)
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
  @Body() data: PartialUserDto) {
    return this.userService.partial(id, data);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

}
