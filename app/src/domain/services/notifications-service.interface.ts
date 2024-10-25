export interface INotificationsService {
  sendNotification(body: string, subject?: string): Promise<boolean>;
}
