import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  findOne(id: number): Promise<Author | null> {
    return this.authorsRepository.findOne({ where: { id: id } });
  }

  create(payload: Partial<Author>): Promise<Author> {
    console.log(payload);
    return this.authorsRepository.save({ ...payload });
  }
}
