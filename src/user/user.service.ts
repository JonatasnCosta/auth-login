import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUserDto } from './dto/partial-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  
  async create(data: CreateUserDto) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return data;
  }

  async findOne(id: number) {
    return id;
  }

  async findAll() {
    return [];
  }

  async update(id: number, data: UpdateUserDto) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return {id, data};
  }

  async partial(id: number, data: PartialUserDto) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return {id, data};
  }
  
  async remove(id: number) {
    return id;
  }
}
