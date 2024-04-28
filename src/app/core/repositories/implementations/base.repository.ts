// base.repository.ts
import { Repository, DeepPartial } from 'typeorm';
import { BaseRepositoryContract } from '../contract/base.repository.contract';
import { Injectable } from '@nestjs/common';


@Injectable()
export  class BaseRepositoryImpl<T> implements BaseRepositoryContract<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(entity: DeepPartial<T>): Promise<T> {
  
    return await this.repository.create(entity);
        
   
  }

  async save(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }


  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }
}
