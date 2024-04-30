// user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryImpl } from 'src/app/core/repositories/implementations/base.repository';
import { UserRepositoryContract } from 'src/app/modules/user/data/contract/user-repository.contract';
import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepositoryImpl extends BaseRepositoryImpl<UserModel> implements UserRepositoryContract {
    constructor(
        @InjectRepository(UserModel)
        protected readonly userRepository: Repository<UserModel>) {
        super(userRepository);
    }
    async findOne(id: string): Promise<UserModel> {
        return await this.userRepository.findOneBy({
            id,
        });
    }
    async findByEmail(email: string): Promise<UserModel> {
        return await this.userRepository.findOneBy({
            email,
        });
    }

   async findUsersGroupedByTypeAndStatus(): Promise<{ type: string, status: boolean, count: number }[]> {
    return this.userRepository
        .createQueryBuilder('user')
        .select('CASE WHEN user.access_level = 1 THEN 1 ELSE 2 END', 'type')
        .addSelect('user.is_enabled', 'status')
        .addSelect('COUNT(user.id)', 'count')
        .groupBy('type')
        .addGroupBy('status')
        .getRawMany();
}

}
