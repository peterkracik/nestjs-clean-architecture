import { Injectable } from '@nestjs/common';
import { INotificationsService } from '@domain/services/notifications-service.interface';

@Injectable()
export class NotificationsService implements INotificationsService {
  async sendNotification(body: string, subject?: string): Promise<boolean> {
    console.log('Sending notification...', body, subject);

    return true;
  }
}
