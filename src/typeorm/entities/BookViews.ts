import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from 'src/typeorm/entities/Book';

@Entity('bookViews')
export class BookViews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  views: number;

  @ManyToOne(() => Book, book => book.views)
  book: Book;
}
