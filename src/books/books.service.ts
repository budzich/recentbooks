import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Book } from 'src/typeorm';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';
import { GetBooksDto } from 'src/books/dto/get-books.dto';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { GetBookDto } from 'src/books/dto/get-book.dto';
import { GenresService } from 'src/genres/genres.service';
import { UsersService } from 'src/users/users.service';
import { BOOKS_PER_PAGE, LATEST_SORT, OLDEST_SORT } from 'src/books/constants';
import { SearchBooksDto } from 'src/books/dto/search-books.dto';
import { BOOK_AUTHOR_RELATION, BOOK_GENRES_RELATION } from 'src/helpers/relations';
import { BOOK_VIEWS_CACHE } from 'src/helpers/cache';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>,
              private usersService: UsersService,
              private genresService: GenresService,
              private filesService: FilesService,
              private cacheService: RedisCacheService) {}

  async create(dto: CreateBookDto, image, user) {
    if (!image) {
      throw new HttpException('Image is required', HttpStatus.BAD_REQUEST);
    }
    const fileName = await this.filesService.createFile(image);
    const fullUser = await this.usersService.getUserByEmail(user.email);
    const genres = await this.genresService.getGenres();
    const bookGenres = JSON.parse(dto.genres)
      .map(genre => genres.find(el => el.id === genre))
      .filter(genre => genre);
    if (!bookGenres.length) {
      throw new HttpException('Valid genres are required', HttpStatus.BAD_REQUEST);
    }
    const book = this.bookRepository.create({
      ...dto,
      genres: bookGenres,
      user: fullUser,
      image: fileName,
    });
    return this.bookRepository.save(book);
  }

  async getBook({ value }: GetBookDto, ip: string) {
    const id = +value;
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: [BOOK_AUTHOR_RELATION, BOOK_GENRES_RELATION],
    });
    if (!book) {
      return new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.saveView(id, ip);
    return book;
  }

  // todo Create type with all sort variants
  getOrder: any = (sortType: string) => {
    switch (sortType) {
      case LATEST_SORT:
        return { created_at: 'DESC' };
      case OLDEST_SORT:
        return { created_at: 'ASC' };
      default:
        return {};
    }
  };

  async getBooks(dto: GetBooksDto) {
    const skip = dto.page ? (+dto.page - 1) * BOOKS_PER_PAGE : 0;
    const books = await this.bookRepository.find({
      skip,
      take: BOOKS_PER_PAGE,
      relations: [BOOK_GENRES_RELATION],
      order: this.getOrder(dto.sort),
    });
    return books;
  }

  async searchBooks({ search }: SearchBooksDto) {
    const books = await this.bookRepository.find({
      skip: 0,
      take: BOOKS_PER_PAGE,
      where: {
        title: ILike(`%${search}%`),
      },
    });

    return books;
  }

  async saveView(id: number, ip: string) {
    const views: IBookView[] = await this.cacheService.get(BOOK_VIEWS_CACHE) || [];
    if (views.some(el => el.id === id && el.ip === ip)) {
      return;
    }
    await this.cacheService.set(BOOK_VIEWS_CACHE, [...views, { id, ip }]);
  }
}
