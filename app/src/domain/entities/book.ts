import { IBook } from '@domain/interfaces/book.interface';
import { BaseEntity } from './base.entity';
import { IAuthor } from '@domain/interfaces/author.interface';

export class Book extends BaseEntity implements IBook {
  id: number;
  title: string;
  author: IAuthor;
}
