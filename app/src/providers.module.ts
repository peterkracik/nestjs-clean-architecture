import { DatabaseModule } from '@frameworks/database/database.module';
import { AuthorsRepository } from '@frameworks/database/repositories/authors.repository';
import { BooksRepository } from '@frameworks/database/repositories/books.repository';
import { Global, Module } from '@nestjs/common';
import {
  AUTH_SERVICE,
  AUTHORS_REPOSITORY,
  BOOKS_REPOSITORY,
  NOTIFICATIONS_SERVICE,
} from './constants';
import { MockDatabaseModule } from '@frameworks/mock-database/mock-database.module';
import { BooksRepository as MockBooksRepository } from '@frameworks/mock-database/repositories/books.repository';
import { AuthorsRepository as MockAuthorsRepository } from '@frameworks/mock-database/repositories/authors.repository';
import { ResendEmailsModule } from '@frameworks/resend-emails/resend-emails.module';
import { RESEND_PROVIDER } from '@frameworks/resend-emails/constants';
import { MockNotificationsModule } from '@frameworks/mock-notifications/mock-notifications.module';
import { NotificationsService } from '@frameworks/mock-notifications/notifications.service';
import { AuthModule } from '@frameworks/auth/auth.module';
import { AuthService } from '@frameworks/auth/auth.service';

@Global()
@Module({
  imports: [
    DatabaseModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
    }),
    MockDatabaseModule,
    ResendEmailsModule.register({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.RESEND_TO_EMAIL,
      defaultSubject: 'Hello',
    }),
    MockNotificationsModule,
    AuthModule,
  ],
  providers: [
    {
      provide: BOOKS_REPOSITORY,
      useExisting: process.env.MOCK ? MockBooksRepository : BooksRepository,
    },
    {
      provide: AUTHORS_REPOSITORY,
      useExisting: process.env.MOCK ? MockAuthorsRepository : AuthorsRepository,
    },
    {
      provide: NOTIFICATIONS_SERVICE,
      useExisting: process.env.MOCK ? NotificationsService : RESEND_PROVIDER,
    },
    {
      provide: AUTH_SERVICE,
      useExisting: AuthService,
    },
  ],
  exports: [
    BOOKS_REPOSITORY,
    AUTHORS_REPOSITORY,
    NOTIFICATIONS_SERVICE,
    AUTH_SERVICE,
  ],
})
export class ProvidersModule {}
