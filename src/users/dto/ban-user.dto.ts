import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ example: 4, description: 'User id' })
  @IsNumber({}, { message: 'Must be a number' })
  readonly userId: number;
  @ApiProperty({ example: 'spam', description: 'Ban reason' })
  @IsString({ message: 'Must be a string' })
  readonly reason: string;
}
