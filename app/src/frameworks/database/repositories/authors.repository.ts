import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { Author } from '@domain/interfaces/author';

@Injectable()
export class AuthorsRepository
  extends Repository<AuthorEntity>
  implements IAuthorsRepository
{
  constructor(dataSource: DataSource) {
    super(AuthorEntity, dataSource.createEntityManager());
  }

  findAll(): Promise<Author[]> {
    return this.find();
  }
  findById(id: number): Promise<Author> {
    return this.findOneBy({ id });
  }

  add(payload: DeepPartial<Author>): Promise<Author> {
    return this.save(payload) as Promise<Author>;
  }
}
