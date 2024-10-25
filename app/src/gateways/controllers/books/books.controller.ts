import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { BookDto } from './dtos/book.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateBookDto } from './dtos/create-book.dto';

@Controller('books')
export class BooksController {
  constructor() {}

  @Get()
  @ApiOkResponse({ type: Array<BookDto> })
  findAll() {
    return [];
  }

  @Get(':id')
  @ApiOkResponse({ type: BookDto })
  async findOne(@Param('id') id: number) {
    return new NotFoundException();
  }

  @Post()
  @ApiCreatedResponse({ type: BookDto })
  create(@Body() createBookDto: CreateBookDto) {
    return { ...createBookDto };
  }
}
