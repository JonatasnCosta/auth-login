import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[JwtModule.register({
    secret: process.env.JWT_SECRET
  }), PrismaModule],
  providers: [SecurityService],
  exports:[SecurityService]
})
export class SecurityModule {}
