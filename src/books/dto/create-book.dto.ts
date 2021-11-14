import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Book title' })
  @IsString({ message: 'Must be a string' })
  @Length(3, 256, { message: 'Length must contain 3-256 symbols' })
  readonly title: string;
  @ApiProperty({ example: 'Once upon...', description: 'Book description' })
  @IsString({ message: 'Must be a string' })
  readonly description: string;
}
