import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  
  @ApiProperty()
  readonly email: string;

  


}
