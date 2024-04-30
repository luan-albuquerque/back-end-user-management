

import { ApiProperty } from '@nestjs/swagger';

export class VerifyTokenPasswordDTO {
  
  @ApiProperty()
  readonly token: string;

}