
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepositoryContract } from '../../user/data/contract/user-repository.contract';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../presentation/dto/login.dto';


@Injectable()
export class AuthenticateUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepositoryContract,
    ) {}

  async execute({email, password}: LoginDto): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException("user or password invalid!")
    }

    const hashedPassword = await bcrypt.compare(password, user.password);

    if (!hashedPassword ) {
        throw new UnauthorizedException("user or password invalid!")
    }
    
    delete user.password;

    const token = this.jwtService.sign(
        { 
            sub: user, 
            permissions: user.access_level
          },
      );

      return token;

  }


}
