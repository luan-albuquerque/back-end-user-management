import { Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { CreateUserUseCase } from './usecase/create-user.usecase';
import { UpdateUserUseCase } from './usecase/update-user.usecase';
import { DeleteUserUseCase } from './usecase/delete-user.usecase';
import { FindAllUsersUseCase } from './usecase/find-all-users.usecase';
import { FindUserByIdUseCase } from './usecase/find-user-by-id.usecase';
import { UserRepositoryContract } from './data/contract/user-repository.contract';
import { DatabaseModule } from './infra/database/database.module';
import { UserRepositoryImpl } from './infra/database/typeorm/repositories/typeorm-user.repository';
import { UserMapper } from './infra/mappers/user.mapper';
import { AuthModule } from '../auth/auth.module';
import { JwtConfigModule } from 'src/app/core/jwt/jwt.module';


@Module({
  imports: [
    DatabaseModule,
    JwtConfigModule,
    
  ],
  controllers: [UserController],
  providers: [
    UserMapper,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    FindAllUsersUseCase,
    FindUserByIdUseCase,
  ], 
  exports: [], 
})
export class UserModule {}