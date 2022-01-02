import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetPopularBooksDto {
  @ApiProperty({ example: '7', description: 'Time period' })
  @IsNotEmpty({message: 'Time period is required'})
  readonly period: string;
}
