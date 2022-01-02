import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { IsEqual } from 'src/auth/decorators/is-equal.decorator';

export class RegisterDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({ example: 'asdasdA!1', description: 'User password' })
  @IsString({ message: 'Must be a string' })
  @Length(6, 16, { message: 'The length must contain 6-16 symbols' })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, {
    message: 'The password must have at least six characters with one uppercase Latin letter, one lower case Latin letter, one number (0-9), one symbol (e.g. !@#$%^&*) and no spaces',
  })
  readonly password: string;

  @ApiProperty({ example: 'asdasdA!1', description: 'Password confirmation' })
  @IsEqual('password', {message: 'The password and confirmation password do not match'})
  readonly password_confirmation: string;
}
