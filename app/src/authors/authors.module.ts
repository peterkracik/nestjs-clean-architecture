import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [],
  providers: [AuthorsService],
})
export class AuthorsModule {}
