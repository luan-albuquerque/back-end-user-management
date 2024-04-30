import { Injectable } from '@nestjs/common';
// import { UserRepository } from '../infra/typeorm/user.repository';
import { UserEntity } from '../domain/user.entity';
import { UserRepositoryContract } from '../data/contract/user-repository.contract';
import { UserMapper } from '../infra/mappers/user.mapper';

@Injectable()
export class FindUsersByTypeStatusUseCase {
     constructor(
        private readonly userRepository: UserRepositoryContract,
        private readonly userMapper: UserMapper
    ){}


    async execute(): Promise<{ type: string, status: boolean, count: number }[]> {
       
        const dash = await this.userRepository.findUsersGroupedByTypeAndStatus();

       return dash;
    }
}