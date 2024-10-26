import { DeepPartial } from 'typeorm';
import { IAuthor } from '@domain/interfaces/author.interface';

export interface IAuthorsRepository {
  findAll(): Promise<Array<IAuthor>>;
  findById(id: number): Promise<IAuthor>;
  add(payload: DeepPartial<IAuthor>): Promise<IAuthor>;
}
