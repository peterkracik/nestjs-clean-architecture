import { IBook } from '@domain/interfaces/book.interface';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

@Injectable()
export class BooksRepository implements IBooksRepository {
  constructor(@Inject('BOOKS_MOCK') private books: IBook[]) {}
  findAll(): Promise<Array<IBook>> {
    return Promise.resolve(this.books);
  }
  add(payload: DeepPartial<IBook>): Promise<IBook> {
    payload.id = this.books.length + 1;
    this.books.push(payload as IBook);
    return Promise.resolve(payload as IBook);
  }

  findById(id: number): Promise<IBook> {
    return Promise.resolve(this.books.find((w) => w.id === id));
  }
}
