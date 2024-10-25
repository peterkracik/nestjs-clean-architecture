import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { Book } from '@domain/interfaces/book';
import { BOOKS_REPOSITORY } from 'src/constats';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';

@Injectable()
export class GetBookByIdUseCase implements BaseUseCase {
  constructor(
    @Inject(BOOKS_REPOSITORY) private readonly booksRepository: IBooksRepository,
  ) {}
  async execute(id: number): Promise<Book> {
    return this.booksRepository.findById(id);
  }
}
