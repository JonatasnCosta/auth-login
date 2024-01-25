import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SecurityService {
    
    constructor(private readonly jwtService: JwtService,
                private readonly mailer: MailerService,
                private readonly prisma: PrismaService
    ) {}

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

    checkToken(token: string){
      return this.jwtService.verify(
        token,{
          issuer: "login",
          audience: "users"
      })
    };

    async forget(user: User){
      const token = this.jwtService.sign({
        id: user.id
      },{
          expiresIn: '30 minutes',
          subject: String(user.id),
          issuer: 'forget',
          audience: 'users'
      });

      await this.mailer.sendMail({
       subject:'Recuperação de senha',
       to:user.email,
       template:'forget',
       context:{
          name: user.name,
          token
       }
     });
     return {
      sucess: 'true'
     } 
    };

    async reset(password: string, token: string){
      try {
        const data:any = this.jwtService.verify(token,{
            issuer: 'forget',
            audience: 'users'
        });
        if (isNaN(Number(data.id))) {
            throw new BadRequestException("Token inválido");
       }
       password = await bcrypt.hash(password, await bcrypt.genSalt());
       const user = await this.prisma.user.update({
        where:{
            id: Number(data.id),
        },
        data:{
            password
        },
       });
       return this.createToken(user);
    } catch (error) {
        throw new BadRequestException(error)
        
    }
   };
   
}
