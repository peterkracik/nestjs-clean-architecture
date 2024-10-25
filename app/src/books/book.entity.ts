import { Author } from 'src/authors/author.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: number;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

}
