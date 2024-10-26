import { IAuthor } from '@domain/interfaces/author.interface';

export class BookDto {
  readonly id: number;
  readonly title: string;
  readonly author: IAuthor;
}
