
import { Injectable } from '@nestjs/common';
// import { UserRepository } from '../infra/typeorm/user.repository';

@Injectable()
export class DeleteUserUseCase {
//   constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    // return this.userRepository.deleteUser(id);
  }
}
