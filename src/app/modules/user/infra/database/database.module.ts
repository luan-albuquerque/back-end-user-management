import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModel } from './typeorm/models/user.model';
import { UserRepositoryContract } from '../../data/contract/user-repository.contract';
import { UserRepositoryImpl } from './typeorm/repositories/typeorm-user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { UserEntity } from '../../domain/user.entity';
import { AccessLevel } from '../../data/enums/acess-level.enum';
import * as bcrypt from 'bcrypt';


@Module({
    imports: [

      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          type:  "postgres",
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [UserModel],
          synchronize: true,
        }),
        inject: [ConfigService],
      }),
      TypeOrmModule.forFeature([UserModel])
    ],  
    providers: [
        {
            provide: UserRepositoryContract,
            useClass: UserRepositoryImpl,
        }
    ],
    exports: [
        UserRepositoryContract
    ]
  })
  export class DatabaseModule {

    constructor(private readonly userRepository: UserRepositoryContract) {
      this.seedUsers();
    }
  
    async seedUsers() {
      const users = await this.userRepository.findAll();
  
      
      if (users.length == 0) {
        
          await this.userRepository.save(
           new UserMapper().entityToModel( UserEntity.create({
            name: "INDT",
            surname: "Melhor Instituto de Manaus",
            access_level: AccessLevel.ADMIN,
            createdAt: new Date(),
            is_enabled: true,
            updatedAt: null,
            email: "testeindtmail@gmail.com",
            password: bcrypt.hashSync("123456", 10)
        }))
          )
      }
    }
  }