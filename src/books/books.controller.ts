import { Body, Controller, Post, Req, UploadedFile, UseGuards } from '@nestjs/common';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { BooksService } from 'src/books/books.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Book, User } from 'src/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({ summary: 'Book creation' })
  @ApiResponse({ status: 200, type: [Book] })
  @UseGuards(JwtAuthGuard)
  @Post()
  createBook(@Body() dto: CreateBookDto,
             @UploadedFile() image,
             @Req() req) {
    return this.booksService.create(dto, image, req.user);
  }
}
