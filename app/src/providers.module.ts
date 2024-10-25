import { DatabaseModule } from '@frameworks/database/database.module';
import { AuthorsRepository } from '@frameworks/database/repositories/authors.repository';
import { BooksRepository } from '@frameworks/database/repositories/books.repository';
import { Global, Module } from '@nestjs/common';
import { AUTHORS_REPOSITORY, BOOKS_REPOSITORY } from './constats';
import { MockDatabaseModule } from '@frameworks/mock-database/mock-database.module';
import { BooksRepository as MockBooksRepository } from '@frameworks/mock-database/repositories/books.repository';
import { AuthorsRepository as MockAuthorsRepository } from '@frameworks/mock-database/repositories/authors.repository';

@Global()
@Module({
  imports: [
    DatabaseModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
    }),
    MockDatabaseModule,
  ],
  providers: [
    {
      provide: BOOKS_REPOSITORY,
      useExisting: process.env.MOCK ? MockBooksRepository : BooksRepository,
    },
    {
      provide: AUTHORS_REPOSITORY,
      useExisting: process.env.MOCK ? MockAuthorsRepository : AuthorsRepository,
    },
  ],
  exports: [BOOKS_REPOSITORY, AUTHORS_REPOSITORY],
})
export class ProvidersModule {}
