import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';
import { IBook } from '@domain/interfaces/book.interface';

@Injectable()
export class BooksRepository
  extends Repository<BookEntity>
  implements IBooksRepository
{
  constructor(dataSource: DataSource) {
    super(BookEntity, dataSource.createEntityManager());
  }

  findAll(): Promise<IBook[]> {
    return this.find();
  }
  findById(id: number): Promise<IBook> {
    return this.findOneBy({ id });
  }

  add(payload: DeepPartial<IBook>): Promise<IBook> {
    return this.save(payload) as Promise<IBook>;
  }
}
