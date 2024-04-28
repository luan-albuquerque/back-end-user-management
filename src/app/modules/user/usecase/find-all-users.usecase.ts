import { Injectable } from '@nestjs/common';
// import { UserRepository } from '../infra/typeorm/user.repository';
import { UserEntity } from '../domain/user.entity';
import { UserRepositoryContract } from '../data/contract/user-repository.contract';
import { UserMapper } from '../infra/mappers/user.mapper';

@Injectable()
export class FindAllUsersUseCase {
     constructor(
        private readonly userRepository: UserRepositoryContract,
        private readonly userMapper: UserMapper
    ){}


    async execute(): Promise<UserEntity[]> {
        const users = await this.userRepository.findAll();

       return this.userMapper.modelsToEntities(users);
    }
}