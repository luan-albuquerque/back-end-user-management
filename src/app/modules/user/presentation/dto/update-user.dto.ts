import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false, description: 'New name of the user.' })
  readonly name?: string;

  @ApiProperty({ required: false, description: 'New surname of the user.' })
  readonly surname?: string;

  @ApiProperty({ required: false, description: 'New email of the user.' })
  readonly email?: string;

  @ApiProperty({ required: false, description: 'New password of the user.' })
  readonly password?: string;

  @ApiProperty({ required: false, description: 'New access level of the user.' })
  readonly access_level?: number;

  @ApiProperty({ required: false, description: 'New status of the user.' })
  readonly is_enabled?: boolean;
}
 