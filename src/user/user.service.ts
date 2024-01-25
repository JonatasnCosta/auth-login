import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  
  async create(data: CreateUserDto) {
    return data;
  }

  async findOne(id: number) {
    return id;
  }

  async findAll() {
    return [];
  }

  async update(id: number, data: UpdateUserDto) {
    return {id, data};
  }

  async partial(id: number, data: UpdateUserDto) {
    return {id, data};
  }
  async remove(id: number) {
    return id;
  }
}
