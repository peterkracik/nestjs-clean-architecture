import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
import { AuthGuard } from '../../guards/auth.guard';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { CouldNotCreateException } from '../../exceptions/could-not-create.exception';

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
    try {
      return await this.getAuthorByIdUseCase.execute(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: AuthorDto })
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    try {
      return await this.createAuthorUseCase.execute({ ...createAuthorDto });
    } catch (error) {
      throw new CouldNotCreateException(error.message);
    }
  }
}
