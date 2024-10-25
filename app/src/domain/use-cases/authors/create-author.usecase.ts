import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { Author } from '@domain/interfaces/author';

type CreateAuthorUseCasePayload = {
  firstName: string;
  lastName: string;
};

@Injectable()
export class CreateAuthorUseCase implements BaseUseCase {
  constructor() {}

  async execute(payload: CreateAuthorUseCasePayload): Promise<Author> {
    const author: Author = {
      id: 1,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };

    return author;
  }
}
