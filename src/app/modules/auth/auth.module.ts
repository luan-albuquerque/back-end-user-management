import { Module } from "@nestjs/common";
import { DatabaseModule } from "../user/infra/database/database.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigModule } from "src/app/core/jwt/jwt.module";
import { AuthenticateUseCase } from "./usecase/authenticate.usecase";
import { AuthController } from "./controller/auth.controller";
import SendEmailConfirmRecoverPasswordUseCase from "../mail/usecase/sendEmailConfirmRecoveyPassword.usecase";
import SendEmailWithTokenForRecoverPasswordUseCase from "../mail/usecase/SendEmailWithTokenForRecoverPassword.usecase";
import SendEmailWithTokenUseCase from "./usecase/send-email-with-token.usecase";
import TokenEncryptUseCase from "./usecase/token-encrypt.usecase";
import RedefinePasswordService from "./usecase/redefine-password.usecase";
import TokenDecryptUseCase from "./usecase/token-decrypt.use.case";
import { UserMapper } from "../user/infra/mappers/user.mapper";


@Module({
  imports: [
    DatabaseModule,
    JwtConfigModule,
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthenticateUseCase,
    SendEmailWithTokenUseCase,
    TokenEncryptUseCase,
    TokenDecryptUseCase,
    UserMapper,
    RedefinePasswordService,
    SendEmailConfirmRecoverPasswordUseCase,
    SendEmailWithTokenForRecoverPasswordUseCase
  ], 
  exports: [], 
})
export class AuthModule {}