import { Injectable, NotFoundException } from '@nestjs/common';
// import { UserRepository } from '../infra/typeorm/user.repository';
import { UserEntity } from '../domain/user.entity';

@Injectable()
export class FindUserByIdUseCase {
//   constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserEntity> {
    // const user = await this.userRepository.findUserById(id);
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    // return user;

    return null;
  }
}
