import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/typeorm/entities/Role';
import { Book } from 'src/typeorm/entities/Book';
import { USER_BOOKS_RELATION, USER_FAVORITE_BOOKS_RELATION, USER_ROLES_RELATION } from 'src/helpers/relations';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'User id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Is banned' })
  @Column({ default: false })
  banned: boolean;

  @ApiProperty({ example: 'spam', description: 'Ban reason' })
  @Column({ nullable: true })
  banReason: string;

  @ApiProperty({ example: [{ id: 1, title: 'USER', description: 'Default user role' }], description: 'User roles' })
  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_roles' })
  [USER_ROLES_RELATION]: Role[];

  @ManyToMany(() => Book)
  @JoinTable({ name: 'user_favorite_books' })
  [USER_FAVORITE_BOOKS_RELATION]: Book[];

  @OneToMany(() => Book, book => book.user)
  [USER_BOOKS_RELATION]: Book[];
}
