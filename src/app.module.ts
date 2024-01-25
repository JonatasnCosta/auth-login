import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'; 
import { UserModule } from './user/user.module';
import { CheckIdMiddleware } from './middlewares/check-id.middleware';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';
import { ConfigModule } from '@nestjs/config';

@Module(
{imports: [UserModule, AuthModule, SecurityModule, ConfigModule.forRoot()], 
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
