import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly surname: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly access_level: number;

  @ApiProperty()
  readonly password: string;
  


}
