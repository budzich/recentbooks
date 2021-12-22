import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { BookViewsService } from 'src/book-views/book-views.service';

@Injectable()
export class TasksService {
  constructor(private cacheService: RedisCacheService,
              private viewsService: BookViewsService) {}

  @Cron('2 3 5 * * *')
  async handleSaveBooksViews() {
    const views = await this.cacheService.get('booksViews') || [];
    await this.viewsService.saveBooksViews(views);
    await this.cacheService.reset();
  }
}
