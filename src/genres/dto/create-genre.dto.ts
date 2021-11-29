import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ example: 'Fantasy', description: 'Genre title' })
  @IsString()
  readonly title: string;
}
