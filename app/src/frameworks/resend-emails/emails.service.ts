import { Inject, Injectable } from '@nestjs/common';
import { ResendEmailsModuleOptions } from './constants';
import { Resend } from 'resend';
import { MODULE_OPTIONS_TOKEN } from './resend-emails.moule-definition';
import { INotificationsService } from '@domain/services/notifications-service.interface';

@Injectable()
export class EmailsService implements INotificationsService {
  private readonly client: Resend;
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: ResendEmailsModuleOptions,
  ) {
    this.client = new Resend(options.apiKey);
  }
  async sendNotification(body: string, subject?: string): Promise<boolean> {
    const response = await this.client.emails.send({
      to: this.options.to,
      from: this.options.from,
      subject: subject || this.options.defaultSubject,
      html: body,
    });

    if (response?.error) {
      console.error(response.error);
      return false;
    }

    return true;
  }
}
