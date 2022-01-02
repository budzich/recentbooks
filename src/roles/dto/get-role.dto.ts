import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetRoleDto {
  @ApiProperty({example: 'USER', description: 'Role title'})
  @IsString({ message: 'Must be a string' })
  readonly value: string;
}
