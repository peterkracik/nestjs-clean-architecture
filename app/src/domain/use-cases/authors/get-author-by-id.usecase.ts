import { Author } from '@domain/interfaces/author';
import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';

@Injectable()
export class GetAuthorByIdUseCase implements BaseUseCase {
  constructor() {}
  async execute(id: number): Promise<Author> {
    return null;
  }
}
