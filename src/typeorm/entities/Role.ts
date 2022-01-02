import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('roles')
export class Role {
  @ApiProperty({ example: 1, description: 'User id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'User role' })
  @Column({ unique: true })
  value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @Column()
  description: string;
}
