import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetBooksDto {
  @ApiProperty({ example: '12', description: 'Books page' })
  @IsOptional()
  readonly page: string;
  @ApiProperty({ example: 'latest', description: 'Sort parameter' })
  @IsOptional()
  readonly sort: string;
}
