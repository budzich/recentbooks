import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookViews } from 'src/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { GetPopularBooksDto } from 'src/book-views/dto/get-books.dto';

@Injectable()
export class BookViewsService {
  constructor(@InjectRepository(BookViews) private viewsRepo: Repository<BookViews>) {}

  async saveBooksViews(views: IBookView[]) {
    const map = new Map;
    views.forEach(({ id }) => map.set(id, (map.get(id) || 0) + 1));
    const newViews = Array.from(map, ([id, views]) => ({ book: { id }, views }));
    await this.viewsRepo.save(newViews);
  }

  async calculateTopViews(period: Date) {
    const views = await this.viewsRepo.find({
      where: {
        created_at: MoreThan(period),
      },
      relations: ['book'],
    });
    const map = new Map;
    views.forEach(({ book }) => map.set(book.id, (map.get(book.id) || 0) + 1));
    const newViews = Array.from(map, ([id, views]) => ({ id, views }));
    newViews.sort((a, b) => b.views - a.views);
    const books = newViews.map(book => ({
      views: book.views,
      book: views.find(view => view.book.id === book.id)?.book,
    }));

    return books;
  }

  async getPopularBooks({ period }: GetPopularBooksDto) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - +period);
    const books = await this.calculateTopViews(date);
    return books;
  }
}
