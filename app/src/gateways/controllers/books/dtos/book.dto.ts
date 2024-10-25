import { Author } from 'src/authors/author.entity';

export class BookDto {
  readonly id: number;
  readonly title: string;
  readonly author: Author;
}
