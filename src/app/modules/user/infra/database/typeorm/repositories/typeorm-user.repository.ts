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

}
