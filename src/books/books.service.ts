import { Injectable } from '@nestjs/common';
import { Book } from 'src/typeorm';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {}

  async create(dto: CreateBookDto, image, user) {
    const fileName = 'asdasd';
    console.log(user);
    // const book = await this.bookRepository.create({ ...dto, user });
  }
}
