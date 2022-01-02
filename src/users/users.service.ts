import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { getAllColumns } from 'src/helpers/typeorm';
import { AddRoleDto } from 'src/users/dto/add-role.dto';
import { BanUserDto } from 'src/users/dto/ban-user.dto';
import { USER_ROLE } from 'src/helpers/roles';
import { USER_ROLES_RELATION } from 'src/helpers/relations';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>,
              private rolesService: RolesService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepo.create(dto);
    const role = await this.rolesService.getRole(USER_ROLE);
    const { password, ...fullUser } = await this.userRepo.save({ ...user, roles: [role] });
    return fullUser;
  }

  async getAllUsers() {
    return await this.userRepo.find({ relations: [USER_ROLES_RELATION] });
  }

  async getUserByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async getUserWithPassword(email: string) {
    const user = await this.userRepo.findOne({
      select: getAllColumns(this.userRepo),
      relations: [USER_ROLES_RELATION],
      where: { email },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepo.findOne(dto.userId, { relations: [USER_ROLES_RELATION] });
    const role = await this.rolesService.getRole(dto.value);
    if (role && user) {
      if (user.roles.some(userRoles => userRoles.value === role.value)) {
        throw new HttpException('User already has this role', HttpStatus.BAD_REQUEST);
      }
      user.roles.push(role);
      await this.userRepo.save(user);
      return dto;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepo.findOne(dto.userId, { relations: ['roles'] });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.reason;
    await this.userRepo.save(user);
    return user;
  }
}
