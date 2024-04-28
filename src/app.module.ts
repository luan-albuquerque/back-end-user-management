import { Module } from '@nestjs/common';
import { UserModule } from './app/modules/user/user.module';
import { DatabaseModule } from './app/modules/user/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
 
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule, 
    UserModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
