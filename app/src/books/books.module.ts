import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [],
  providers: [BooksService],
})
export class BooksModule {}
