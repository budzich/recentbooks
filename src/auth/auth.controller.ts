import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200 })
  @Post('/login')
  @HttpCode(200)
  login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201 })
  @Post('register')
  registration(@Body() userDto: RegisterDto) {
    return this.authService.register(userDto);
  }
}
