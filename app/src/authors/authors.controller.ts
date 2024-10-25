import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateAuthorDto } from './create-author.dto';
import { AuthorDto } from './author.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiOkResponse({ type: Array<AuthorDto> })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AuthorDto })
  @ApiNotFoundResponse({ description: 'Author not found' })
  async findOne(@Param('id') id: number) {
    const author = await this.authorsService.findOne(id);
    if (!author) {
      return new NotFoundException();
    }
    return author;
  }

  @Post()
  @ApiCreatedResponse({ type: AuthorDto })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create({ ...createAuthorDto });
  }
}
