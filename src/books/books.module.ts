import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book, User } from 'src/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [
    TypeOrmModule.forFeature([User, Book]),
    AuthModule,
  ],
})
export class BooksModule {}
