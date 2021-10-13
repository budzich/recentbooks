import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async login({ password, email }: CreateUserDto) {
    const fullUser = await this.userService.getFullUserByEmail(email);
    const { password: userPassword, ...user } = fullUser;
    const isValid = await bcrypt.compare(password, userPassword);

    if (!user || !isValid) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async register(userDto: CreateUserDto) {
    const potentialUser = await this.userService.getUserByEmail(userDto.email);
    if (potentialUser) {
      throw new HttpException('This user has already exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    return this.generateToken(user);
  }

  async generateToken(user) {
    const payload = { email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
