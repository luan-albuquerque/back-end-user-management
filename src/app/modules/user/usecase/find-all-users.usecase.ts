import { Injectable } from '@nestjs/common';
// import { UserRepository } from '../infra/typeorm/user.repository';
import { UserEntity } from '../domain/user.entity';

@Injectable()
export class FindAllUsersUseCase {
//   constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserEntity[]> {
    // return this.userRepository.findAllUsers();
    return null;
  }
}