import { Module } from '@nestjs/common';
import { CreateBookUseCase } from './books/create-book.usecase';
import { GetBookByIdUseCase } from './books/get-book-by-id.usecase';
import { GetAllBooksUseCase } from './books/get-all-books.usecase';
import { CreateAuthorUseCase } from './authors/create-author.usecase';
import { GetAuthorByIdUseCase } from './authors/get-author-by-id.usecase';
import { GetAllAuthorsUseCase } from './authors/get-all-authors.usecase';

const useCases = [
  GetAllAuthorsUseCase,
  GetAuthorByIdUseCase,
  CreateAuthorUseCase,
  GetAllBooksUseCase,
  GetBookByIdUseCase,
  CreateBookUseCase,
];

@Module({
  imports: [],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}
