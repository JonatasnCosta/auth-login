import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SecurityService } from 'src/security/security.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly prisma: PrismaService,
                private readonly security: SecurityService
    ) {}

    async register(data: AuthRegisterDto){
        return this.userService.create(data);
    }

    async login(email: string, password: string){
        const user = await this.prisma.user.findFirst({
            where:{
            email
            }
        });
        if (!user || ! await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException("Incorrect email or password")
        }
        return this.security.createToken(user);
    };

    async forget(email: string){
        const user = await this.prisma.user.findFirst({
            where:{email}
        });
        if (!user) {
            throw new UnauthorizedException("Incorrect email")
        }
        return this.security.forget(user);
    };
    
}
