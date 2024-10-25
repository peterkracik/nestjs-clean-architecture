import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { AuthorDto } from './dtos/author.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('authors')
export class AuthorsController {
  constructor() {}

  @Get()
  @ApiOkResponse({ type: Array<AuthorDto> })
  findAll() {
    return [];
  }

  @Get(':id')
  @ApiOkResponse({ type: AuthorDto })
  @ApiNotFoundResponse({ description: 'Author not found' })
  async findOne(@Param('id') id: number) {
    return new NotFoundException();
  }

  @Post()
  @ApiCreatedResponse({ type: AuthorDto })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return { ...createAuthorDto };
  }
}
