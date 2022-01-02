import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({ example: 'MODERATOR', description: 'Role title' })
  @IsString({ message: 'Must be a string' })
  readonly value: string;
  @ApiProperty({ example: 4, description: 'User id' })
  @IsNumber({}, { message: 'Must be a number' })
  readonly userId: number;
}
