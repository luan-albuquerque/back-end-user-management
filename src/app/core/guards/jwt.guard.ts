import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
   
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
     if(decoded){
    
        if(!decoded.sub.is_enabled){
           throw new UnauthorizedException("User not authorized")
        }
     }
      
      request.user = decoded;
      
      return true;
    } catch (error) {

      return false;
    }
  }
}
