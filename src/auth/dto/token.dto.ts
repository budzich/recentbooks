import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ example: 'dasdasd2e.adsdsad.23adsdas', description: 'JWT token' })
  readonly token: string;
}
