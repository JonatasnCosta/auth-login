import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async register(data: AuthRegisterDto){
        return this.userService.create(data);
    }
}
