import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../presentation/dto/update-user.dto';
import { UserEntity } from '../domain/user.entity';
import { UserRepositoryContract } from '../data/contract/user-repository.contract';
import { UserMapper } from '../infra/mappers/user.mapper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase {
   constructor(
    private readonly userRepository: UserRepositoryContract,
    private readonly userMapper: UserMapper
    ) {}
    async execute(userId: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const existingUserModel = await this.userRepository.findOne(userId);
        if (!existingUserModel) {
          throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        const existingUser = this.userMapper.modelToEntity(existingUserModel);
      
        if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
          const userWithEmail = await this.userRepository.findByEmail(updateUserDto.email);
          if (userWithEmail) {
            throw new HttpException("Email already exists", HttpStatus.CONFLICT);
          }
        }        
      
        if (updateUserDto.name) {
          existingUser.updateName(updateUserDto.name);
        }
        if (updateUserDto.surname) {
          existingUser.updateSurname(updateUserDto.surname);
        }
        if (updateUserDto.password) {
          existingUser.updatePassword(bcrypt.hashSync(updateUserDto.password, 10));
        }
        if (updateUserDto.access_level) {
          existingUser.updateAccesslevel(updateUserDto.access_level);
        }
        if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
          existingUser.updateEmail(updateUserDto.email);
        }
      
        const t = this.userMapper.entityToModel(existingUser)
        
        await this.userRepository.save(t);
      
        return existingUser;
      }
}