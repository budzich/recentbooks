import { IsString } from 'class-validator';

export class GetBookDto {
  @IsString({ message: 'Must be a string' })
  readonly value: string;
}
