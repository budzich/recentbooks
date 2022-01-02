import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GenresService } from 'src/genres/genres.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Genre } from 'src/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateGenreDto } from 'src/genres/dto/create-genre.dto';
import { GENRES_TAG } from 'src/helpers/tags';
import { GENRES_ROUTE } from 'src/helpers/routes';
import { ADMIN_ROLE } from 'src/helpers/roles';

@ApiTags(GENRES_TAG)
@Controller(GENRES_ROUTE)
export class GenresController {
  constructor(private genreService: GenresService) {}

  @ApiOperation({ summary: 'Genre creation' })
  @ApiResponse({ status: 201, type: Genre })
  @UseGuards(JwtAuthGuard)
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Post()
  createBook(@Body() dto: CreateGenreDto) {
    return this.genreService.create(dto);
  }

  @ApiOperation({ summary: 'Genres receiving' })
  @ApiResponse({ status: 200, type: [Genre] })
  @Get()
  getGenres() {
    return this.genreService.getGenres();
  }
}
