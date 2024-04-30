import { IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';
import { AccessLevel } from '../enums/acess-level.enum';


export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly surname?: string;

  @IsOptional()
  @IsString()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsEnum(AccessLevel)
  readonly access_level?: AccessLevel;

  @IsOptional()
  @IsBoolean()
  readonly is_enabled?: boolean;
}
