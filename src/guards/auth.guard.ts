import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SecurityService } from 'src/security/security.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly security: SecurityService) {}

  canActivate( context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];
      request.user = this.security.checkToken(token);
      if (!token) {
        throw new ForbiddenException();
      }
    } catch (error) {
      throw new ForbiddenException();
    }
    return true;
  }
}

