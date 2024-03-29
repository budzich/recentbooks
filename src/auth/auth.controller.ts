import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { TokenDto } from 'src/auth/dto/token.dto';
import { LOGIN_ROUTE, REGISTER_ROUTE } from 'src/helpers/routes';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, type: TokenDto })
  @Post(LOGIN_ROUTE)
  @HttpCode(200)
  login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, type: TokenDto })
  @Post(REGISTER_ROUTE)
  registration(@Body() userDto: RegisterDto) {
    return this.authService.register(userDto);
  }
}
