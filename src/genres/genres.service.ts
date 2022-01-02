import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGenreDto } from 'src/genres/dto/create-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from 'src/typeorm/entities/Genre';

@Injectable()
export class GenresService {
  constructor(@InjectRepository(Genre) private genreRepo: Repository<Genre>) {}

  async create({ title }: CreateGenreDto) {
    const isExists = await this.genreRepo.findOne({ where: { title } });
    if (isExists) {
      throw new HttpException('This genre already exists', HttpStatus.BAD_REQUEST);
    }
    const genre = await this.genreRepo.create({ title });
    return this.genreRepo.save(genre);
  }

  async getGenres() {
    return this.genreRepo.find();
  }
}
