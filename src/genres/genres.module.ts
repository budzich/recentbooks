import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [GenresService],
  controllers: [GenresController],
  imports: [
    TypeOrmModule.forFeature([Genre]),
    AuthModule,
  ],
  exports: [
    GenresService,
  ],
})
export class GenresModule {}
