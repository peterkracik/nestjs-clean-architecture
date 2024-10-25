import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { Author } from '@domain/interfaces/author';
import { AUTHORS_REPOSITORY, NOTIFICATIONS_SERVICE } from 'src/constats';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { INotificationsService } from '@domain/services/notifications-service.interface';

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

  async execute(payload: CreateAuthorUseCasePayload): Promise<Author> {
    const author = await this.authorsRepository.add({
      firstName: payload.firstName,
      lastName: payload.lastName,
    });

    await this.notificationService.sendNotification(
      `Author ${author.firstName} ${author.lastName} has been created`,
      'New author created',
    );

    return author;
  }
}
