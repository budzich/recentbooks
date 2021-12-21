import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GenresService } from 'src/genres/genres.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Book } from 'src/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateGenreDto } from 'src/genres/dto/create-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private genreService: GenresService) {}

  @ApiOperation({ summary: 'Genre creation' })
  @ApiResponse({ status: 200, type: Book })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  createBook(@Body() dto: CreateGenreDto) {
    return this.genreService.create(dto);
  }

  @ApiOperation({ summary: 'Genre creation' })
  @ApiResponse({ status: 200, type: Book })
  @Get()
  getGenres() {
    return this.genreService.getGenres();
  }
}
