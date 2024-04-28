import { Body, Controller, HttpCode, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/app/core/guards/jwt.guard';
import { LoginDto } from '../presentation/dto/login.dto';
import { AuthenticateUseCase } from '../usecase/authenticate.usecase';
import SendEmailWithTokenUseCase from '../usecase/send-email-with-token.usecase';
import { UpdatePasswordDto } from '../presentation/dto/update-password.dto';
import { RedefinePasswordDTO } from '../presentation/dto/redefine-password.dto';
import RedefinePasswordService from '../usecase/redefine-password.usecase';

@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
   constructor(
    private readonly authenticateUseCase: AuthenticateUseCase,
    private readonly sendEmailWithTokenUseCase: SendEmailWithTokenUseCase,
    private readonly redefinePasswordService: RedefinePasswordService

   ) {}

  @Post('login')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: LoginDto, description: 'Credentials for login.' })
  async login(@Body() loginDto: LoginDto) {
     return await this.authenticateUseCase.execute(loginDto);
  }

  @Put('email-repair-password')
  @ApiResponse({ status: 200, description: 'Send Email success.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    await this.sendEmailWithTokenUseCase.execute(updatePasswordDto.email);
  }

  @Put('redefine-password')
  @ApiResponse({ status: 200, description: 'Password updated.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async redefinePassword(@Body() redefinePasswordDTO: RedefinePasswordDTO) {

    await this.redefinePasswordService.execute(redefinePasswordDTO);
  }
}



