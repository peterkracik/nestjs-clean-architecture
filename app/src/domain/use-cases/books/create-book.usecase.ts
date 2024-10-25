import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { Book } from '@domain/interfaces/book';
import { BOOKS_REPOSITORY } from 'src/constats';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';

type CreateBookUseCasePayload = {
  title: string;
  author: number;
};

@Injectable()
export class CreateBookUseCase implements BaseUseCase {
  constructor(
    @Inject(BOOKS_REPOSITORY) private readonly booksRepository: IBooksRepository,
  ) {}

  async execute(payload: CreateBookUseCasePayload): Promise<Book> {
    return this.booksRepository.add({
      title: payload.title,
      author: {
        id: payload.author,
      },
    });
  }
}
