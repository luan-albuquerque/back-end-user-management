import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { AccessLevel } from '../enums/acess-level.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(AccessLevel)
  readonly access_level: AccessLevel;
}
