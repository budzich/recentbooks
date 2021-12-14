import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GenresModule } from './genres/genres.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { TasksModule } from './tasks/tasks.module';
import { BookViewsModule } from './book-views/book-views.module';
import * as path from 'path';

console.log(process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'static'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.MYSQL_DB_HOST,
      port: Number.parseInt(process.env.MYSQL_DB_PORT) || 5432,
      username: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASS,
      database: process.env.MYSQL_DB_NAME,
      entities,
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    BooksModule,
    FilesModule,
    GenresModule,
    RedisCacheModule,
    TasksModule,
    BookViewsModule,
  ],
})
export class AppModule {}
