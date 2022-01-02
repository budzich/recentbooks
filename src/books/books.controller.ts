import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { BooksService } from 'src/books/books.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from 'src/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetBooksDto } from 'src/books/dto/get-books.dto';
import { GetBookDto } from 'src/books/dto/get-book.dto';
import { SearchBooksDto } from 'src/books/dto/search-books.dto';
import { BOOKS_TAG } from 'src/helpers/tags';
import { BOOKS_ROUTE, BOOKS_SEARCH_ROUTE, GET_BOOK_ROUTE } from 'src/helpers/routes';

@ApiTags(BOOKS_TAG)
@Controller(BOOKS_ROUTE)
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({ summary: 'Book creation' })
  @ApiResponse({ status: 201, type: Book })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', {}))
  @Post()
  createBook(@Body() dto: CreateBookDto,
             @UploadedFile() image,
             @Req() req) {
    return this.booksService.create(dto, image, req.user);
  }

  @ApiOperation({ summary: 'Book receiving' })
  @ApiResponse({ status: 200, type: Book })
  @Get(GET_BOOK_ROUTE)
  getBook(@Param() dto: GetBookDto,
          @Req() req) {
    return this.booksService.getBook(dto, req.ip);
  }

  @ApiOperation({ summary: 'Books receiving' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get()
  getBooks(@Query() dto: GetBooksDto) {
    return this.booksService.getBooks(dto);
  }

  @ApiOperation({ summary: 'Books searching' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get(BOOKS_SEARCH_ROUTE)
  searchBooks(@Query() dto: SearchBooksDto) {
    return this.booksService.searchBooks(dto);
  }
}
