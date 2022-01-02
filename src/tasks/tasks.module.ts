import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { BookViewsModule } from 'src/book-views/book-views.module';

@Module({
  providers: [TasksService],
  imports: [ScheduleModule.forRoot(), RedisCacheModule, BookViewsModule],
})
export class TasksModule {}
