import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

console.log(process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
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
  ],
})
export class AppModule {}
