import { Book } from '@domain/interfaces/book';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AuthorEntity } from './author.entity';
import { Author } from '@domain/interfaces/author';

@Entity('book')
export class BookEntity implements Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => AuthorEntity, (author) => author.books, { eager: true })
  author: Author;
}
