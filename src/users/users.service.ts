import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { getAllColumns } from 'src/helpers/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
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
      where: { email },
    });
    return user;
  }
}
