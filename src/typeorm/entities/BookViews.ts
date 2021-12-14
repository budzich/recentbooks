import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from 'src/typeorm/entities/Book';

@Entity('book_views')
export class BookViews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  views: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @ManyToOne(() => Book, book => book.views)
  book: Book;
}
