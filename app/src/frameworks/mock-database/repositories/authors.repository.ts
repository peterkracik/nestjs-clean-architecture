import { IAuthor } from '@domain/interfaces/author.interface';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AuthorsRepository implements IAuthorsRepository {
  constructor(@Inject('AUTHORS_MOCK') private authors: IAuthor[]) {}
  findAll(): Promise<Array<IAuthor>> {
    return Promise.resolve(this.authors);
  }
  add(payload: DeepPartial<IAuthor>): Promise<IAuthor> {
    payload.id = this.authors.length + 1;
    this.authors.push(payload as IAuthor);
    return Promise.resolve(payload as IAuthor);
  }

  findById(id: number): Promise<IAuthor> {
    return Promise.resolve(this.authors.find((w) => w.id === id));
  }
}
