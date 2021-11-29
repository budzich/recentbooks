import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { getAllColumns } from 'src/helpers/typeorm';
import { AddRoleDto } from 'src/users/dto/add-role.dto';
import { BanUserDto } from 'src/users/dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const isExists = await this.userRepo.findOne({ where: { email: dto.email } });

    if (isExists) {
      throw new HttpException('This user already exists', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepo.create(dto);
    const role = await this.rolesService.getRole('USER');
    return await this.userRepo.save({ ...user, roles: [role] });
  }

  async getAllUsers() {
    return await this.userRepo.find({ relations: ['roles'] });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email }, relations: ['roles'] });
    return user;
  }

  async getUserWithPassword(email: string) {
    const user = await this.userRepo.findOne({
      select: getAllColumns(this.userRepo),
      relations: ['roles'],
      where: { email },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepo.findOne(dto.userId, { relations: ['roles'] });
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
