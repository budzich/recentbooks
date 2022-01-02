import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'For Whom the Bell Tolls', description: 'Book title' })
  @IsString({ message: 'Must be a string' })
  @Length(3, 60, { message: 'Length must contain 3-60 symbols' })
  readonly title: string;
  @ApiProperty({ example: 'Once upon...', description: 'Book description' })
  @IsNotEmpty()
  @IsString({ message: 'Must be a string' })
  readonly description: string;
  @ApiProperty({ example: '[2, 5]', description: 'Book genres' })
  @IsString({ message: 'Must be an array' })
  readonly genres: string;
}
