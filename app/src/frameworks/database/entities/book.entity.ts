import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AuthorEntity } from './author.entity';
import { IAuthor } from '@domain/interfaces/author.interface';
import { IBook } from '@domain/interfaces/book.interface';

@Entity('book')
export class BookEntity implements IBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => AuthorEntity, (author) => author.books, { eager: true })
  author: IAuthor;
}
