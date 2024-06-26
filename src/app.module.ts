import { Module } from '@nestjs/common';
import { UserModule } from './app/modules/user/user.module';
import { DatabaseModule } from './app/modules/user/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigModule } from './app/core/jwt/jwt.module';
import { AuthModule } from './app/modules/auth/auth.module';
import { MailModule } from './app/modules/mail/mail.module';

 
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule, 
    MailModule,
    JwtConfigModule,
    AuthModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {

}
