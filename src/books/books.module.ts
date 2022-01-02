import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { GenresModule } from 'src/genres/genres.module';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [
    TypeOrmModule.forFeature([Book]),
    AuthModule,
    FilesModule,
    UsersModule,
    RedisCacheModule,
    GenresModule,
  ],
})
export class BooksModule {}
