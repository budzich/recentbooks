import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async login(userDto: LoginDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register({ email, password }: RegisterDto) {
    const potentialUser = await this.userService.getUserByEmail(email);
    if (potentialUser) {
      throw new HttpException('This user has already exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await this.userService.createUser({ email, password: hashPassword });
    return this.generateToken(user);
  }

  async generateToken(user) {
    const payload = { email: user.email, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser({ password, email }: CreateUserDto) {
    const fullUser = await this.userService.getUserWithPassword(email);

    if (!fullUser) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }

    const { password: userPassword, ...user } = fullUser;
    const isValid = await bcrypt.compare(password, userPassword);

    if (user && isValid) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Invalid credentials' });
  }
}
