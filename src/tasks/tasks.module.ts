import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookViews } from 'src/typeorm';

@Module({
  providers: [TasksService],
  imports: [ScheduleModule.forRoot(), RedisCacheModule, TypeOrmModule.forFeature([BookViews])],
})
export class TasksModule {}
