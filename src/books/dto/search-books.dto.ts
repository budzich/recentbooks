import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SearchBooksDto {
  @ApiProperty({ example: 'Harry Potter', description: 'Book title' })
  @IsNotEmpty({ message: 'Search parameter is required' })
  readonly search: string;
}
