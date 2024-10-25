import { Author } from '@domain/interfaces/author';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AuthorsRepository implements IAuthorsRepository {
  constructor(@Inject('AUTHORS_MOCK') private authors: Author[]) {}
  findAll(): Promise<Array<Author>> {
    return Promise.resolve(this.authors);
  }
  add(payload: DeepPartial<Author>): Promise<Author> {
    this.authors.push(payload as Author);
    return Promise.resolve(payload as Author);
  }

  findById(id: number): Promise<Author> {
    return Promise.resolve(this.authors.find((w) => w.id === id));
  }
}
