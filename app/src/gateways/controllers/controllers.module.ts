import { Module } from '@nestjs/common';
import { BooksController } from './books/books.controller';
import { AuthorsController } from './authors/authors.controller';

@Module({
  controllers: [AuthorsController, BooksController],
})
export class ControllersModule {}
