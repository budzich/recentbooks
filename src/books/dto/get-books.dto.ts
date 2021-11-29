import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetBooksDto {
  @ApiProperty({ example: '12', description: 'Books receiving' })
  @IsOptional()
  readonly page: string;
}
