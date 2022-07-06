import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/typeorm/entities/User';
import { Genre } from 'src/typeorm/entities/Genre';
import { BookViews } from 'src/typeorm/entities/BookViews';
import {
  BOOK_AUTHOR_RELATION,
  BOOK_COMMENTS_RELATION,
  BOOK_GENRES_RELATION,
  BOOK_VIEWS_RELATION,
} from 'src/helpers/relations';
import { Comment } from 'src/typeorm/entities/Comment';

@Entity('books')
export class Book {
  @ApiProperty({ example: 1, description: 'Book id' })
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

  @ApiProperty({ example: '(TIMESTAMP)', description: 'Creation date' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @ManyToOne(() => User, user => user.books)
  [BOOK_AUTHOR_RELATION]: User;

  @ManyToMany(() => Genre)
  @JoinTable({ name: 'book_genres' })
  [BOOK_GENRES_RELATION]: Genre[];

  @OneToMany(() => BookViews, bookViews => bookViews.book)
  [BOOK_VIEWS_RELATION]: BookViews[];

  @OneToMany(() => Comment, comment => comment.book)
  [BOOK_COMMENTS_RELATION]: Comment[];
}
