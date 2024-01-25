import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'; 
import { UserModule } from './user/user.module';
import { CheckIdMiddleware } from './middlewares/check-id.middleware';

@Module(
{imports: [UserModule], 
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
