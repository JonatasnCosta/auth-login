import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class SecurityService {
    
    constructor(private readonly jwtService: JwtService) {}

    createToken(user: User){
        return {
            acessToken:this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
              }, {
                expiresIn: "30 days",
                subject: String(user.id),
                issuer: "login",
                audience: "users"
              })
        }
    };
}
