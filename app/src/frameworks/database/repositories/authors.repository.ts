import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { IAuthor } from '@domain/interfaces/author.interface';

@Injectable()
export class AuthorsRepository
  extends Repository<AuthorEntity>
  implements IAuthorsRepository
{
  constructor(dataSource: DataSource) {
    super(AuthorEntity, dataSource.createEntityManager());
  }

  findAll(): Promise<IAuthor[]> {
    return this.find();
  }
  findById(id: number): Promise<IAuthor> {
    return this.findOneBy({ id });
  }

  add(payload: DeepPartial<IAuthor>): Promise<IAuthor> {
    return this.save(payload) as Promise<IAuthor>;
  }
}
