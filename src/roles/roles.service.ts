import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  async createRole(dto: CreateRoleDto) {
    const isExists = await this.roleRepo.findOne({ where: { value: dto.value } });

    if (isExists) {
      throw new HttpException('This role has already been created', HttpStatus.BAD_REQUEST);
    }

    const role = await this.roleRepo.create(dto);
    return this.roleRepo.save(role);
  }

  async getRole(value: string) {
    const role = await this.roleRepo.findOne({ where: { value } });
    return role;
  }
}
