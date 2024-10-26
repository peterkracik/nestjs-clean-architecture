import { IAuthor } from './author.interface';

export interface IBook {
  id: number;
  title: string;
  author: IAuthor;
}
