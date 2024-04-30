import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessLevel } from 'src/app/modules/user/data/enums/acess-level.enum';
import { UserEntity } from 'src/app/modules/user/domain/user.entity';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user 
    
    
    if (user && user.sub.access_level == AccessLevel.ADMIN) {
      return true; 
    } else {
        throw new ForbiddenException('Access forbidden. Admin rights required.');
    }
  }
}