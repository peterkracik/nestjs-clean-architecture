import { Module } from '@nestjs/common';
import { BooksController } from './books/books.controller';
import { AuthorsController } from './authors/authors.controller';
import { UseCasesModule } from '@domain/use-cases/use-cases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [AuthorsController, BooksController],
})
export class ControllersModule {}
