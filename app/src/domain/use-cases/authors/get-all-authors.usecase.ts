import { Injectable } from '@nestjs/common';
import { Author } from '@domain/interfaces/author';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';

@Injectable()
export class GetAllAuthorsUseCase implements BaseUseCase {
  constructor() {}
  async execute(): Promise<Author[]> {
    return [];
  }
}
