import { DatabaseModule } from '@frameworks/database/database.module';
import { AuthorsRepository } from '@frameworks/database/repositories/authors.repository';
import { BooksRepository } from '@frameworks/database/repositories/books.repository';
import { Global, Module } from '@nestjs/common';
import { AUTHORS_REPOSITORY, BOOKS_REPOSITORY } from './constats';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: BOOKS_REPOSITORY,
      useExisting: BooksRepository,
    },
    {
      provide: AUTHORS_REPOSITORY,
      useExisting: AuthorsRepository,
    },
  ],
  exports: [BOOKS_REPOSITORY, AUTHORS_REPOSITORY],
})
export class ProvidersModule {}
