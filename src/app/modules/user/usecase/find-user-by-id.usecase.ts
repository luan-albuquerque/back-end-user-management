import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../domain/user.entity';
import { UserRepositoryContract } from '../data/contract/user-repository.contract';
import { UserMapper } from '../infra/mappers/user.mapper';

@Injectable()
export class FindUserByIdUseCase {
    constructor(
        private readonly userRepository: UserRepositoryContract,
        private readonly userMapper: UserMapper

    ) { }

    async execute(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.userMapper.modelToEntity(user);

    }
}
