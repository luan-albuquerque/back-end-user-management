import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModel } from './typeorm/models/user.model';
import { UserRepositoryContract } from '../../data/contract/user-repository.contract';
import { UserRepositoryImpl } from './typeorm/repositories/typeorm-user.repository';

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
  export class DatabaseModule {}