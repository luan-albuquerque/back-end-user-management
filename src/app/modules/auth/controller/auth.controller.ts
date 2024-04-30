import { Body, Controller, HttpCode, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/app/core/guards/jwt.guard';
import { LoginDto } from '../presentation/dto/login.dto';
import { AuthenticateUseCase } from '../usecase/authenticate.usecase';
import SendEmailWithTokenUseCase from '../usecase/send-email-with-token.usecase';
import { UpdatePasswordDto } from '../presentation/dto/update-password.dto';
import { RedefinePasswordDTO } from '../presentation/dto/redefine-password.dto';
import RedefinePasswordUseCase from '../usecase/redefine-password.usecase';
import VerifyTokenNewPasswordUseCase from '../usecase/verify-token-new-pass.usecase';
import { VerifyTokenPasswordDTO } from '../presentation/dto/verify-token-password.dto';

  
@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
   constructor(
    private readonly authenticateUseCase: AuthenticateUseCase,
    private readonly sendEmailWithTokenUseCase: SendEmailWithTokenUseCase,
    private readonly redefinePasswordUseCase: RedefinePasswordUseCase,
    private readonly verifyTokenNewPasswordUseCase: VerifyTokenNewPasswordUseCase

   ) {}

  @Post('login')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: LoginDto, description: 'Credentials for login.' })
  async login(@Body() loginDto: LoginDto) {
     return await this.authenticateUseCase.execute(loginDto);
  }

  @Patch('validate-token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Password updated.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async validateToken(@Req() req: any) {

   return req.user;
   
  }

  @Patch('email-repair-password')
  @ApiResponse({ status: 200, description: 'Send Email success.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    await this.sendEmailWithTokenUseCase.execute(updatePasswordDto.email);
  }

  @Put('redefine-password')
  @ApiResponse({ status: 200, description: 'Password updated.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async redefinePassword(@Body() redefinePasswordDTO: RedefinePasswordDTO) {

    await this.redefinePasswordUseCase.execute(redefinePasswordDTO);
  }


  @Patch('verify-token-password')
  @ApiResponse({ status: 200, description: 'Password updated.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async verifyTokenPass(@Body() verifyTokenPassword: VerifyTokenPasswordDTO) {

    await this.verifyTokenNewPasswordUseCase.execute(verifyTokenPassword.token);
  }
}


