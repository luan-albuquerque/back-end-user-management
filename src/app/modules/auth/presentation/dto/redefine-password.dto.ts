

import { ApiProperty } from '@nestjs/swagger';

export class RedefinePasswordDTO {
  
  @ApiProperty()
  readonly token: string;

    
  @ApiProperty()
  readonly password: string;

    
  @ApiProperty()
  readonly confirmpassword: string;
  


}