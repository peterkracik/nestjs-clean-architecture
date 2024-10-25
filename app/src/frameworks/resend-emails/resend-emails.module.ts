import { Module } from '@nestjs/common';
import { RESEND_PROVIDER, ResendEmailsModuleOptions } from './constants';
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from './resend-emails.moule-definition';
import { EmailsService } from './emails.service';

@Module({
  providers: [
    {
      provide: RESEND_PROVIDER,
      useFactory: async (options: ResendEmailsModuleOptions) => {
        return new EmailsService(options);
      },
      inject: [MODULE_OPTIONS_TOKEN],
    },
  ],
  exports: [RESEND_PROVIDER],
})
export class ResendEmailsModule extends ConfigurableModuleClass {}
