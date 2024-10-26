import { IAuthor } from '@domain/interfaces/author.interface';
import { BaseEntity } from './base.entity';
import { IBook } from '@domain/interfaces/book.interface';

export class Author extends BaseEntity implements IAuthor {
  id: number;
  firstName: string;
  lastName: string;

  books: IBook[];
}
