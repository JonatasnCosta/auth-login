import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'; 
import { UserModule } from './user/user.module';
import { CheckIdMiddleware } from './middlewares/check-id.middleware';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module(
{imports: [UserModule, AuthModule, SecurityModule, ConfigModule.forRoot(),

    MailerModule.forRoot({
    /*Here you access the link https://ethereal.email/
    and modifies transport, port, auth, user, pass data*/
    transport: {host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'alyce.moen@ethereal.email',
        pass: 'p8e9njr8Wj8998Qye9'
    }},
    defaults: {
      from: '"nest-modules" <modules@nestjs.com>',
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
})
], 
controllers: [], 
providers: [], 
}) 

export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        
        consumer.apply(CheckIdMiddleware).forRoutes({
            path:'users/:id',
            method: RequestMethod.ALL
        })
    }
}
