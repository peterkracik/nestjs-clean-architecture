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
import { CreateBookUseCase } from '@domain/use-cases/books/create-book.usecase';
import { GetBookByIdUseCase } from '@domain/use-cases/books/get-book-by-id.usecase';
import { GetAllBooksUseCase } from '@domain/use-cases/books/get-all-books.usecase';

@Controller('books')
export class BooksController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getAllBooksUseCase: GetAllBooksUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: Array<BookDto> })
  findAll() {
    return this.getAllBooksUseCase.execute();
  }

  @Get(':id')
  @ApiOkResponse({ type: BookDto })
  async findOne(@Param('id') id: number) {
    const book = await this.getBookByIdUseCase.execute(id);
    if (book) {
      return book;
    }
    return new NotFoundException();
  }

  @Post()
  @ApiCreatedResponse({ type: BookDto })
  create(@Body() createBookDto: CreateBookDto) {
    return this.createBookUseCase.execute(createBookDto);
  }
}
