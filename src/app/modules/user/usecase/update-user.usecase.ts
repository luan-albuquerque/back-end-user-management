import { Injectable } from '@nestjs/common';
// import { UserRepository } from '../infra/typeorm/user.repository';
import { UpdateUserDto } from '../data/dto/update-user.dto';
import { UserEntity } from '../domain/user.entity';

@Injectable()
export class UpdateUserUseCase {
//   constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    // return this.userRepository.updateUser(id, updateUserDto);
    return null;
  }
}