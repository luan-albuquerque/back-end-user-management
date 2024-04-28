import { Injectable } from '@nestjs/common';
// import { UserRepository } from '../infra/typeorm/user.repository';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { UserEntity } from '../domain/user.entity';
import { UserRepositoryContract } from '../data/contract/user-repository.contract';
import { UserMapper } from '../infra/mappers/user.mapper';

@Injectable()
export class CreateUserUseCase {
   constructor(
    private readonly userRepository: UserRepositoryContract,
    private readonly userMapper: UserMapper
    ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {

    
    const user = UserEntity.create({
        name: createUserDto.name,
        access_level: createUserDto.access_level,
        surname: createUserDto.surname,
        password: createUserDto.password,
        email: createUserDto.email,
        createdAt: new Date()
    })

   const userModel = this.userMapper.entityToModel(user);

   await this.userRepository.create(userModel);
   await this.userRepository.save(userModel);
   
   return user;
    
  }
}