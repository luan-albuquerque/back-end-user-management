import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { UserEntity } from '../domain/user.entity';
import { UserRepositoryContract } from '../data/contract/user-repository.contract';
import { UserMapper } from '../infra/mappers/user.mapper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
   constructor(
    private readonly userRepository: UserRepositoryContract,
    private readonly userMapper: UserMapper
    ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {


    const findByEmail = await this.userRepository.findByEmail(createUserDto.email);

    if(findByEmail){
     throw new HttpException("email already exists", HttpStatus.CONFLICT)
    }
    
    const user = UserEntity.create({
        name: createUserDto.name,
        access_level: createUserDto.access_level,
        surname: createUserDto.surname,
        password: bcrypt.hashSync(createUserDto.password, 10),
        email: createUserDto.email,
        createdAt: new Date()
    })

     const userModel = this.userMapper.entityToModel(user);
 
    await this.userRepository.save(userModel);

   return user;
    
  }
}