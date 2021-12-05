import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BookViews } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(private cacheService: RedisCacheService,
              @InjectRepository(BookViews) private viewsRepo: Repository<BookViews>) {}

  @Cron('6 * * * * *')
  async handleSaveBooksViews() {
    const views = await this.cacheService.get('booksViews') || [];
    const map = new Map;
    views.forEach(({ id }) => map.set(id, (map.get(id) || 0) + 1));
    const newViews = Array.from(map, ([id, views]) => ({ book: { id }, views }));
    await this.viewsRepo.save(newViews);
  }
}
