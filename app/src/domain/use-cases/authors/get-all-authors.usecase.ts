import { Injectable, Inject } from '@nestjs/common';
import { Author } from '@domain/interfaces/author';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { AUTHORS_REPOSITORY } from 'src/constats';

@Injectable()
export class GetAllAuthorsUseCase implements BaseUseCase {
  constructor(
    @Inject(AUTHORS_REPOSITORY) private readonly authorsRepository: IAuthorsRepository,
  ) {}
  async execute(): Promise<Author[]> {
    return this.authorsRepository.findAll();
  }
}
