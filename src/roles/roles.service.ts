import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepo.create(dto);
    return this.roleRepo.save(role);
  }

  async getRole(value: string) {
    const role = await this.roleRepo.findOne({ where: { value } });
    return role;
  }
}
