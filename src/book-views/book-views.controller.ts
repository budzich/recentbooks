import { Controller, Get, Query } from '@nestjs/common';
import { BookViewsService } from 'src/book-views/book-views.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from 'src/typeorm';
import { GetPopularBooksDto } from 'src/book-views/dto/get-books.dto';
import { BOOKS_TAG } from 'src/helpers/tags';
import { POPULAR_BOOKS_ROUTE } from 'src/helpers/routes';

@ApiTags(BOOKS_TAG)
@Controller(POPULAR_BOOKS_ROUTE)
export class BookViewsController {
  constructor(private viewsService: BookViewsService) {}

  @ApiOperation({ summary: 'Popular books receiving' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get()
  getPopularBooks(@Query() dto: GetPopularBooksDto) {
    return this.viewsService.getPopularBooks(dto);
  }
}
