import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable, OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/typeorm/entities/Role';
import { Book } from 'src/typeorm/entities/Book';

@Entity('users')
export class User {
  @ApiProperty({ example: '1', description: 'User id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'asdasdA!1', description: 'User password' })
  @Column({ select: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Is banned' })
  @Column({ default: false })
  banned: boolean;

  @ApiProperty({ example: 'spam', description: 'Ban reason' })
  @Column({ nullable: true })
  banReason: string;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @ManyToMany(() => Book)
  @JoinTable({ name: 'user_favorite_books' })
  favoriteBooks: Book[];

  @OneToMany(() => Book, book => book.user)
  books: Book[];
}
