import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Book, Genre, User } from 'src/typeorm';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';
import { GetBooksDto } from 'src/books/dto/get-books.dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>,
              @InjectRepository(User) private usersRepo: Repository<User>,
              @InjectRepository(Genre) private genresRepo: Repository<Genre>,
              private filesService: FilesService) {}

  async create(dto: CreateBookDto, image, user) {
    if (!image) {
      throw new HttpException('Image is required', HttpStatus.BAD_REQUEST);
    }
    const fileName = await this.filesService.createFile(image);
    const fullUser = await this.usersRepo.findOne({ where: { email: user.email } });
    const genres = await this.genresRepo.find();
    const bookGenres = genres.filter(genre => dto.genres.includes((genre.id).toString()));
    const book = this.bookRepository.create({ ...dto, genres: bookGenres, user: fullUser, image: fileName });
    return this.bookRepository.save(book);
  }

  async getBooks(dto: GetBooksDto) {
    const skip = dto.page ? (+dto.page - 1) * 10 : 0;

    const books = await this.bookRepository.find({
      skip,
      take: 10,
      relations: ['genres'],
    });

    if (!books.length) {
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    }

    return books;
  }
}
