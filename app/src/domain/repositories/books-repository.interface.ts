import { DeepPartial } from 'typeorm';
import { IBook } from '@domain/interfaces/book.interface';

export interface IBooksRepository {
  findAll(): Promise<Array<IBook>>;
  findById(id: number): Promise<IBook>;
  add(payload: DeepPartial<IBook>): Promise<IBook>;
}
