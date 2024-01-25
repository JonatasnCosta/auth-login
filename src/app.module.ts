import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'; 
import { UserModule } from './user/user.module';
import { CheckIdMiddleware } from './middlewares/check-id.middleware';
import { AuthModule } from './auth/auth.module';

@Module(
{imports: [UserModule, AuthModule], 
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
