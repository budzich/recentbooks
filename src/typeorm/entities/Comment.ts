import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/typeorm/entities/User';
import {
  COMMENT_AUTHOR_RELATION, COMMENT_BOOK_RELATION, COMMENT_CHILDREN_RELATION, COMMENT_PARENT_RELATION,
} from 'src/helpers/relations';
import { Book } from 'src/typeorm/entities/Book';

@Entity('comments')
export class Comment {
  @ApiProperty({ example: 1, description: 'Comment id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'This is amazing!', description: 'Comment text' })
  @Column()
  title: string;

  @ApiProperty({ example: '(TIMESTAMP)', description: 'Creation date' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @ManyToOne(() => User, user => user.comments)
  [COMMENT_AUTHOR_RELATION]: User;

  @ManyToOne(() => Book, book => book.comments)
  [COMMENT_BOOK_RELATION]: Book;

  @ManyToOne(() => Comment, comment => comment.children)
  [COMMENT_PARENT_RELATION]: Comment;

  @OneToMany(() => Comment, comment => comment.parent)
  [COMMENT_CHILDREN_RELATION]: Comment;
}
