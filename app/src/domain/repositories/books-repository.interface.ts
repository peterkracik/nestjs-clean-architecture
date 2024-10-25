import { DeepPartial } from 'typeorm';
import { Book } from '@domain/interfaces/book';

export interface IBooksRepository {
  findAll(): Promise<Array<Book>>;
  findById(id: number): Promise<Book>;
  add(payload: DeepPartial<Book>): Promise<Book>;
}
