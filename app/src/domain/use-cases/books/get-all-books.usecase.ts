import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '@domain/use-cases/base-use-case.interface';
import { Book } from '@domain/interfaces/book';

@Injectable()
export class GetAllBooksUseCase implements BaseUseCase {
  constructor() {}
  async execute(): Promise<Book[]> {
    return [];
  }
}
