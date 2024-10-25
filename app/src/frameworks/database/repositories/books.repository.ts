import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';
import { Book } from '@domain/interfaces/book';

@Injectable()
export class BooksRepository
  extends Repository<BookEntity>
  implements IBooksRepository
{
  constructor(dataSource: DataSource) {
    super(BookEntity, dataSource.createEntityManager());
  }

  findAll(): Promise<Book[]> {
    return this.find();
  }
  findById(id: number): Promise<Book> {
    return this.findOneBy({ id });
  }

  add(payload: DeepPartial<Book>): Promise<Book> {
    return this.save(payload) as Promise<Book>;
  }
}
