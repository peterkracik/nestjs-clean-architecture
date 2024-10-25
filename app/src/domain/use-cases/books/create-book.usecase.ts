import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { Book } from '@domain/interfaces/book';

type CreateBookUseCasePayload = {
  title: string;
  author: number;
};

@Injectable()
export class CreateBookUseCase implements BaseUseCase {
  constructor() {}

  async execute(payload: CreateBookUseCasePayload): Promise<Book> {
    const book: Book = {
      id: 1,
      title: payload.title,
      author: {
        id: payload.author,
        firstName: 'John',
        lastName: 'Doe',
      },
    };

    return book;
  }
}
