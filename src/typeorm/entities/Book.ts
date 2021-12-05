import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable, ManyToOne, OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/typeorm/entities/User';
import { Genre } from 'src/typeorm/entities/Genre';
import { BookViews } from 'src/typeorm/entities/BookViews';

@Entity('books')
export class Book {
  @ApiProperty({ example: '1', description: 'Book id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'For Whom the Bell Tolls', description: 'Book title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Once upon...', description: 'Book description' })
  @Column()
  description: string;

  @ApiProperty({ example: 'image.png', description: 'Book poster' })
  @Column({ default: false })
  image: string;

  @ManyToOne(() => User, user => user.books)
  user: User;

  @ManyToMany(() => Genre)
  @JoinTable({ name: 'book_genres' })
  genres: Genre[];

  @OneToMany(() => BookViews, bookViews => bookViews.book)
  views: BookViews[];
}
