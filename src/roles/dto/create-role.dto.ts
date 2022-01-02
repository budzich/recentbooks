import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({example: 'USER', description: 'Role title'})
  @IsString({ message: 'Must be a string' })
  readonly value: string;
  @ApiProperty({example: 'Default user role', description: 'Role description'})
  @IsString({ message: 'Must be a string' })
  readonly description: string;
}
