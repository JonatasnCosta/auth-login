import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { LogInterceptador } from 'src/interceptadors/log-interceptador';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';

@UseInterceptors(LogInterceptador)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body()data: AuthRegisterDto){
    return this.authService.register(data);
  }

  @Post('login')
  async login(@Body(){email, password}: AuthLoginDto){
    return this.authService.login(email, password);
  }

  @Post('forget')
  async forget(@Body(){email}: AuthForgetDto){
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body(){password, token}: AuthResetDto){
    return this.authService.reset(password, token);
  }
  
}
