import { Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,
              private readonly userService : UserService
  ) {}

 async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  
    
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const request = await this.userService.findOne(user.id)
    if (!request) {
      return false;
     }
    
    const rolesFiltered = requiredRoles.some((role: Role) => role <= request.role);
    
    if (request.role === Role.Admin) {
       return rolesFiltered
     }
    return false
  }
}
