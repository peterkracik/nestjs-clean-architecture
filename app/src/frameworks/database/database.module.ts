import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksRepository } from './repositories/books.repository';
import { AuthorsRepository } from './repositories/authors.repository';
import { ConfigurableModuleClass } from './database.module-definition';
import { DatabaseModuleOptions } from './constants';

@Module({})
export class DatabaseModule extends ConfigurableModuleClass {
  public static forRoot(options: DatabaseModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          type: options.type,
          host: options.host,
          port: options.port,
          username: options.username,
          password: options.password,
          database: options.database,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([BooksRepository, AuthorsRepository]),
      ],
      providers: [BooksRepository, AuthorsRepository],
      exports: [BooksRepository, AuthorsRepository],
    };
  }

}
