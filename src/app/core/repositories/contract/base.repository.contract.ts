import { DeepPartial } from 'typeorm';

export abstract class BaseRepositoryContract<T> {
 abstract create(entity: DeepPartial<T>): Promise<T>;
 abstract save(entity: T): Promise<T>;
 abstract delete(id: string): Promise<void>;
 abstract findAll(): Promise<T[]>;
}
