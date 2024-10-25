import { Module } from '@nestjs/common';
import { booksMock } from './mocks/books.mock';
import { authorsMock } from './mocks/authors.mock';
import { AuthorsRepository } from './repositories/authors.repository';
import { BooksRepository } from './repositories/books.repository';

@Module({
  providers: [
    BooksRepository,
    AuthorsRepository,
    {
      provide: 'BOOKS_MOCK',
      useValue: booksMock,
    },
    {
      provide: 'AUTHORS_MOCK',
      useValue: authorsMock,
    },
  ],
  exports: [BooksRepository, AuthorsRepository],
})
export class MockDatabaseModule {}
