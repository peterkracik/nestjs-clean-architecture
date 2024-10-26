import { IBook } from './book.interface';

export interface IAuthor {
  id: number;
  firstName: string;
  lastName: string;
  books?: IBook[];
}
