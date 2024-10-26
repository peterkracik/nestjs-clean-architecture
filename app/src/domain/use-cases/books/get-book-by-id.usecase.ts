import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { BOOKS_REPOSITORY } from '@/constants';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';
import { IBook } from '@domain/interfaces/book.interface';
import { Book } from '@domain/entities/book';

@Injectable()
export class GetBookByIdUseCase implements BaseUseCase {
  constructor(
    @Inject(BOOKS_REPOSITORY)
    private readonly booksRepository: IBooksRepository,
  ) {}
  async execute(id: number): Promise<IBook> {
    const booksData = await this.booksRepository.findById(id);
    if (!booksData) {
      throw new Error(`Book with id ${id} not found`);
    }

    // This is necessary only if we need some business logic to be applied to the data
    const book = new Book().fromDao(booksData);
    // ... some business logic

    return book;
  }
}
