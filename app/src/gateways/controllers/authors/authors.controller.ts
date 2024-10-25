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
import { CreateAuthorUseCase } from '@domain/use-cases/authors/create-author.usecase';
import { GetAuthorByIdUseCase } from '@domain/use-cases/authors/get-author-by-id.usecase';
import { GetAllAuthorsUseCase } from '@domain/use-cases/authors/get-all-authors.usecase';

@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly createAuthorUseCase: CreateAuthorUseCase,
    private readonly getAuthorByIdUseCase: GetAuthorByIdUseCase,
    private readonly getAllAuthorsUseCase: GetAllAuthorsUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: Array<AuthorDto> })
  findAll() {
    return this.getAllAuthorsUseCase.execute();
  }

  @Get(':id')
  @ApiOkResponse({ type: AuthorDto })
  @ApiNotFoundResponse({ description: 'Author not found' })
  async findOne(@Param('id') id: number) {
    const author = await this.getAuthorByIdUseCase.execute(id);
    if (author) {
      return author;
    }
    return new NotFoundException();
  }

  @Post()
  @ApiCreatedResponse({ type: AuthorDto })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.createAuthorUseCase.execute({ ...createAuthorDto });
  }
}
