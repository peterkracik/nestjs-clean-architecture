import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { Author } from '@domain/interfaces/author';
import { AUTHORS_REPOSITORY } from 'src/constats';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';

type CreateAuthorUseCasePayload = {
  firstName: string;
  lastName: string;
};

@Injectable()
export class CreateAuthorUseCase implements BaseUseCase {
  constructor(
    @Inject(AUTHORS_REPOSITORY) private readonly authorsRepository: IAuthorsRepository,
  ) {}

  async execute(payload: CreateAuthorUseCasePayload): Promise<Author> {
    return this.authorsRepository.add({
      firstName: payload.firstName,
      lastName: payload.lastName,
    });
  }
}
