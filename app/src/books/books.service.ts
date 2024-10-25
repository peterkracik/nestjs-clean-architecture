import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(id: number): Promise<Book | null> {
    return this.booksRepository.findOne({ where: { id: id } });
  }

  create(payload: DeepPartial<Book>): Promise<Book> {
    return this.booksRepository.save({ ...payload });
  }
}
