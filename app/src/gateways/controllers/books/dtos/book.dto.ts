import { Author } from '@domain/interfaces/author';

export class BookDto {
  readonly id: number;
  readonly title: string;
  readonly author: Author;
}
