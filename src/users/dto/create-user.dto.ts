import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;
  @ApiProperty({ example: 'asdasdA!1', description: 'User password' })
  @IsString({ message: 'Must be a string' })
  @Length(6, 16, { message: 'Length must contain 6-16 symbols' })
  readonly password: string;
}
