import { Book } from '@domain/interfaces/book';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

@Injectable()
export class BooksRepository implements IBooksRepository {
  constructor(@Inject('BOOKS_MOCK') private books: Book[]) {}
  findAll(): Promise<Array<Book>> {
    return Promise.resolve(this.books);
  }
  add(payload: DeepPartial<Book>): Promise<Book> {
    this.books.push(payload as Book);
    return Promise.resolve(payload as Book);
  }

  findById(id: number): Promise<Book> {
    return Promise.resolve(this.books.find((w) => w.id === id));
  }
}
