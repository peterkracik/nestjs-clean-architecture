import { Injectable, Inject } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { AUTHORS_REPOSITORY } from 'src/constats';
import { IAuthor } from '@domain/interfaces/author.interface';
import { Author } from '@domain/entities/author';

@Injectable()
export class GetAllAuthorsUseCase implements BaseUseCase {
  constructor(
    @Inject(AUTHORS_REPOSITORY)
    private readonly authorsRepository: IAuthorsRepository,
  ) {}
  async execute(): Promise<IAuthor[]> {
    const authorsData = await this.authorsRepository.findAll();

    return authorsData.map((author) => new Author().fromDao(author));
  }
}
