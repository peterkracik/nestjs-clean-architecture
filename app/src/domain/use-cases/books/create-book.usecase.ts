import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { Book } from '@domain/interfaces/book';
import { BOOKS_REPOSITORY, NOTIFICATIONS_SERVICE } from 'src/constats';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';
import { INotificationsService } from '@domain/services/notifications-service.interface';

type CreateBookUseCasePayload = {
  title: string;
  author: number;
};

@Injectable()
export class CreateBookUseCase implements BaseUseCase {
  constructor(
    @Inject(BOOKS_REPOSITORY)
    private readonly booksRepository: IBooksRepository,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationService: INotificationsService,
  ) { }

  async execute(payload: CreateBookUseCasePayload): Promise<Book> {
    const book = await this.booksRepository.add({
      title: payload.title,
      author: {
        id: payload.author,
      },
    });

    await this.notificationService.sendNotification(
      `Book ${book.title} has been created`,
      'New book created',
    );

    return book;
  }
}
