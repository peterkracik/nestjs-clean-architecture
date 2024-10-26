import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookDto } from './dtos/book.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateBookDto } from './dtos/create-book.dto';
import { CreateBookUseCase } from '@domain/use-cases/books/create-book.usecase';
import { GetBookByIdUseCase } from '@domain/use-cases/books/get-book-by-id.usecase';
import { GetAllBooksUseCase } from '@domain/use-cases/books/get-all-books.usecase';
import { NotFoundException } from '@gateways/exceptions/not-found.exception';
import { CouldNotCreateException } from '@gateways/exceptions/could-not-create.exception';

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
    try {
      return await this.getBookByIdUseCase.execute(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  @ApiCreatedResponse({ type: BookDto })
  async create(@Body() createBookDto: CreateBookDto) {
    try {
      return await this.createBookUseCase.execute(createBookDto);
    } catch (error) {
      throw new CouldNotCreateException(error.message);
    }
  }
}
