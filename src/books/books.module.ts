import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book, Genre, User } from 'src/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [
    TypeOrmModule.forFeature([User, Book, Genre]),
    AuthModule,
    FilesModule,
    UsersModule,
  ],
})
export class BooksModule {}
