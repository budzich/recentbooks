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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Book } from 'src/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetBooksDto } from 'src/books/dto/get-books.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetBookDto } from 'src/books/dto/get-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({ summary: 'Book creation' })
  @ApiResponse({ status: 200, type: Book })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image', {}))
  @Post()
  createBook(@Body() dto: CreateBookDto,
             @UploadedFile() image,
             @Req() req) {
    return this.booksService.create(dto, image, req.user);
  }

  @ApiOperation({ summary: 'Book receiving' })
  @ApiResponse({ status: 200, type: Book })
  @Get('/:value')
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
}
