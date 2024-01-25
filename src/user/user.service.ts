import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUserDto } from './dto/partial-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return this.prisma.user.create({
      data
    })
  }

  async findOne(id: number) {
    return this.prisma.user.findFirst({
      where:{id}
    })
  }

  async findAll() {
    return this.prisma.user.findMany()
  }

  async update(id: number, data: UpdateUserDto) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return this.prisma.user.update({
      data,
      where:{id}
    })
  }

  async partial(id: number, data: PartialUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    }
    return this.prisma.user.update({
      data,
      where:{id}
    })
  }
  
  async remove(id: number) {
    if (! await this.findOne(id)) {
      throw new BadRequestException("User does not exist")
    }
    return this.prisma.user.delete({
      where:{id}
    })
  }
}
