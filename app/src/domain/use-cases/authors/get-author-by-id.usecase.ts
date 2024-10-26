import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { AUTHORS_REPOSITORY } from '@/constants';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { IAuthor } from '@domain/interfaces/author.interface';
import { Author } from '@domain/entities/author';

@Injectable()
export class GetAuthorByIdUseCase implements BaseUseCase {
  constructor(
    @Inject(AUTHORS_REPOSITORY)
    private readonly authorsRepository: IAuthorsRepository,
  ) {}
  async execute(id: number): Promise<IAuthor> {
    const authorData = await this.authorsRepository.findById(id);

    if (!authorData) {
      throw new Error('Author not found');
    }

    return new Author().fromDao(authorData);
  }
}
