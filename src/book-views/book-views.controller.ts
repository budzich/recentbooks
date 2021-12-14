import { Controller, Get, Query } from '@nestjs/common';
import { BookViewsService } from 'src/book-views/book-views.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Book } from 'src/typeorm';
import { GetPopularBooksDto } from 'src/book-views/dto/get-books.dto';

@Controller('popular')
export class BookViewsController {
  constructor(private viewsService: BookViewsService) {}

  @ApiOperation({ summary: 'Popular books receiving' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get()
  getPopularBooks(@Query() dto: GetPopularBooksDto) {
    return this.viewsService.getPopularBooks(dto);
  }
}
