import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { IBook } from '@domain/interfaces/book.interface';
import {
  AUTHORS_REPOSITORY,
  BOOKS_REPOSITORY,
  NOTIFICATIONS_SERVICE,
} from 'src/constats';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';
import { INotificationsService } from '@domain/services/notifications-service.interface';
import { Book } from '@domain/entities/book';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { Author } from '@domain/entities/author';

type CreateBookUseCasePayload = {
  title: string;
  author: number;
};

@Injectable()
export class CreateBookUseCase implements BaseUseCase {
  constructor(
    @Inject(BOOKS_REPOSITORY)
    private readonly booksRepository: IBooksRepository,
    @Inject(AUTHORS_REPOSITORY)
    private readonly authorsRepository: IAuthorsRepository,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationService: INotificationsService,
  ) {}

  async execute(payload: CreateBookUseCasePayload): Promise<IBook> {
    // fetch author data
    const authorData = await this.authorsRepository.findById(payload.author);
    if (!authorData) {
      throw new Error('Author not found');
    }
    const author = new Author().fromDao(authorData);

    // create book
    const book = new Book();
    book.title = payload.title;
    book.author = author;

    // save book
    const created = await this.booksRepository.add(book);
    if (!created) {
      throw new Error('Could not create book');
    }

    // merge created data into book
    book.fromDao(created);

    await this.notificationService.sendNotification(
      `Book ${book.title} has been created with id ${book.id}`,
      'New book created',
    );

    return book;
  }
}
