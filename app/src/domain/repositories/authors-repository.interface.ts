import { DeepPartial } from 'typeorm';
import { Author } from '@domain/interfaces/author';

export interface IAuthorsRepository {
  findAll(): Promise<Array<Author>>;
  findById(id: number): Promise<Author>;
  add(payload: DeepPartial<Author>): Promise<Author>;
}

