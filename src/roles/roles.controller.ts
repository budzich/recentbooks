import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { GetRoleDto } from 'src/roles/dto/get-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ROLES_TAG } from 'src/helpers/tags';
import { GET_ROLE_ROUTE, ROLES_ROUTE } from 'src/helpers/routes';
import { ADMIN_ROLE } from 'src/helpers/roles';

@ApiTags(ROLES_TAG)
@Controller(ROLES_ROUTE)
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Role creation' })
  @ApiResponse({ status: 201, type: Role })
  @UseGuards(JwtAuthGuard)
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({ summary: 'Role receiving' })
  @ApiResponse({ status: 200, type: Role })
  @UseGuards(JwtAuthGuard)
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Get(GET_ROLE_ROUTE)
  getRole(@Param() dto: GetRoleDto) {
    return this.rolesService.getRole(dto.value);
  }
}
