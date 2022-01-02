import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { BookViewsService } from 'src/book-views/book-views.service';
import { BOOK_VIEWS_CACHE } from 'src/helpers/cache';

@Injectable()
export class TasksService {
  constructor(private cacheService: RedisCacheService,
              private viewsService: BookViewsService) {}

  @Cron('2 * * * * *')
  async handleSaveBooksViews() {
    const views = await this.cacheService.get(BOOK_VIEWS_CACHE) || [];
    await this.viewsService.saveBooksViews(views);
    await this.cacheService.reset();
  }
}
