import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { GetRoleDto } from 'src/roles/dto/get-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Get('/:value')
  getRole(@Param() dto: GetRoleDto) {
    return this.rolesService.getRole(dto.value);
  }
}
