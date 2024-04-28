
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryContract } from '../data/contract/user-repository.contract';
import { UserMapper } from '../infra/mappers/user.mapper';

@Injectable()
export class DeleteUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryContract,
        private readonly userMapper: UserMapper

        ) {}
  async execute(id: string): Promise<void> {

    const user = await this.userRepository.findOne(id);
    if (!user) {
        throw new NotFoundException('User not found');
    }

     await this.userRepository.delete(id);
  }
}
