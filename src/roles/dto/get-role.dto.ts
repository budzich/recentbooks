import { IsString } from 'class-validator';

export class GetRoleDto {
  @IsString({ message: 'Must be a string' })
  readonly value: string;
}
