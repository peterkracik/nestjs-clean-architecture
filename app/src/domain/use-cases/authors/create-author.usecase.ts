import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { IAuthor } from '@domain/interfaces/author.interface';
import { AUTHORS_REPOSITORY, NOTIFICATIONS_SERVICE } from '@/constants';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { INotificationsService } from '@domain/services/notifications-service.interface';
import { Author } from '@domain/entities/author';

type CreateAuthorUseCasePayload = {
  firstName: string;
  lastName: string;
};

@Injectable()
export class CreateAuthorUseCase implements BaseUseCase {
  constructor(
    @Inject(AUTHORS_REPOSITORY)
    private readonly authorsRepository: IAuthorsRepository,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationService: INotificationsService,
  ) {}

  async execute(payload: CreateAuthorUseCasePayload): Promise<IAuthor> {
    // This is necessary only if we need some business logic to be applied to the data
    const author = new Author();
    author.firstName = payload.firstName;
    author.lastName = payload.lastName;

    // create author in the database
    const created = await this.authorsRepository.add({
      firstName: payload.firstName,
      lastName: payload.lastName,
    });

    if (!created) {
      throw new Error('Author not created');
    }

    // merge the created data with the author entity
    author.fromDao(created);

    await this.notificationService.sendNotification(
      `Author ${author.firstName} ${author.lastName} has been created with id ${author.id}`,
      'New author created',
    );

    return author;
  }
}
