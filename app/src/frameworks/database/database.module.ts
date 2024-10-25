import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksRepository } from './repositories/books.repository';
import { AuthorsRepository } from './repositories/authors.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([BooksRepository, AuthorsRepository]),
  ],
  providers: [BooksRepository, AuthorsRepository],
  exports: [BooksRepository, AuthorsRepository],
})
export class DatabaseModule {}
