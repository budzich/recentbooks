import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from 'src/users/dto/ban-user.dto';
import { USER_BAN_ROUTE, USER_ROLES_ROUTE, USERS_ROUTE } from 'src/helpers/routes';
import { ADMIN_ROLE } from 'src/helpers/roles';
import { USERS_TAG } from 'src/helpers/tags';

@ApiTags(USERS_TAG)
@Controller(USERS_ROUTE)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Getting users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Issuance of roles' })
  @ApiResponse({ status: 200, type: AddRoleDto })
  @UseGuards(JwtAuthGuard)
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Post(USER_ROLES_ROUTE)
  @HttpCode(200)
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'User ban' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Post(USER_BAN_ROUTE)
  @HttpCode(200)
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
