import { Module } from '@nestjs/common';
import { BookViewsService } from './book-views.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookViews } from 'src/typeorm';
import { BookViewsController } from './book-views.controller';

@Module({
  providers: [BookViewsService],
  exports: [BookViewsService],
  imports: [TypeOrmModule.forFeature([BookViews])],
  controllers: [BookViewsController],
})
export class BookViewsModule {}
