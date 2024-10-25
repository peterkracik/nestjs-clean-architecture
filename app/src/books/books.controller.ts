import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { BookDto } from './book.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOkResponse({ type: Array<BookDto> })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BookDto })
  async findOne(@Param('id') id: number) {
    const book = await this.booksService.findOne(+id);
    if (!book) {
      return new NotFoundException();
    }
    return book;
  }

  @Post()
  @ApiCreatedResponse({ type: BookDto })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create({
      ...createBookDto,
      author: { id: createBookDto.author },
    });
  }
}
