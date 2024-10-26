import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { BOOKS_REPOSITORY } from '@/constants';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';
import { IBook } from '@domain/interfaces/book.interface';
import { Book } from '@domain/entities/book';

@Injectable()
export class GetAllBooksUseCase implements BaseUseCase {
  constructor(
    @Inject(BOOKS_REPOSITORY)
    private readonly booksRepository: IBooksRepository,
  ) {}
  async execute(): Promise<IBook[]> {
    const booksData = await this.booksRepository.findAll();

    return booksData.map((book) => new Book().fromDao(book));
  }
}
