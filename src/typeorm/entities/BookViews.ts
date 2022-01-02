import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from 'src/typeorm/entities/Book';
import { VIEW_BOOK_RELATION } from 'src/helpers/relations';
import { ApiProperty } from '@nestjs/swagger';

@Entity('book_views')
export class BookViews {
  @ApiProperty({ example: 1, description: 'View id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 23, description: 'Book views amount' })
  @Column()
  views: number;

  @ApiProperty({ example: '(TIMESTAMP)', description: 'View date' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @ManyToOne(() => Book, book => book.views)
  [VIEW_BOOK_RELATION]: Book;
}
