import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { Book } from '@domain/interfaces/book';
import { BOOKS_REPOSITORY } from 'src/constats';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';

@Injectable()
export class GetAllBooksUseCase implements BaseUseCase {
  constructor(
    @Inject(BOOKS_REPOSITORY)
    private readonly booksRepository: IBooksRepository,
  ) {}
  async execute(): Promise<Book[]> {
    return this.booksRepository.findAll();
  }
}
