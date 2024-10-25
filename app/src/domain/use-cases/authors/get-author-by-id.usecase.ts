import { Author } from '@domain/interfaces/author';
import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { AUTHORS_REPOSITORY } from 'src/constats';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';

@Injectable()
export class GetAuthorByIdUseCase implements BaseUseCase {
  constructor(
    @Inject(AUTHORS_REPOSITORY) private readonly authorsRepository: IAuthorsRepository,
  ) {}
  async execute(id: number): Promise<Author> {
    return this.authorsRepository.findById(id);
  }
}
