import { EmailsService } from './emails.service';
import { CreateEmailResponse, ErrorResponse, Resend } from 'resend';
import { ResendEmailsModuleOptions } from './constants';

// Mock the Resend class
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn(), // Mock the send method here
      },
    })),
  };
});

describe('EmailsService', () => {
  let emailsService: EmailsService;
  let mockResendInstance: jest.Mocked<Resend>;

  const moduleOptions: ResendEmailsModuleOptions = {
    apiKey: 'test-api-key',
    to: 'test@example.com',
    from: 'noreply@example.com',
    defaultSubject: 'Default Subject',
  };

  beforeEach(() => {
    // Create a new instance of the mocked Resend class
    mockResendInstance = new Resend(
      moduleOptions.apiKey,
    ) as jest.Mocked<Resend>;

    // Initialize the EmailsService with the mocked Resend instance
    emailsService = new EmailsService(moduleOptions);

    (emailsService as any).client = mockResendInstance;
  });

  describe('sendNotification', () => {
    it('should send an email and return true on success', async () => {
      // Mock the resolved value of the send method
      (mockResendInstance.emails.send as any).mockResolvedValue({
        data: { id: '1' },
      } as CreateEmailResponse);

      const result = await emailsService.sendNotification(
        '<p>Hello</p>',
        'Test Subject',
      );

      expect(mockResendInstance.emails.send).toHaveBeenCalledWith({
        to: moduleOptions.to,
        from: moduleOptions.from,
        subject: 'Test Subject',
        html: '<p>Hello</p>',
      });
      expect(result).not.toHaveProperty('error');
    });

    it('should send an email with the default subject if none is provided', async () => {
      (mockResendInstance.emails.send as any).mockResolvedValue({
        data: { id: '1' },
      } as CreateEmailResponse);

      const result = await emailsService.sendNotification('<p>Hello</p>');

      expect(mockResendInstance.emails.send).toHaveBeenCalledWith({
        to: moduleOptions.to,
        from: moduleOptions.from,
        subject: moduleOptions.defaultSubject,
        html: '<p>Hello</p>',
      });
      expect(result).toBe(true);
    });

    it('should log an error and return false if sending fails', async () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      (mockResendInstance.emails.send as any).mockResolvedValue({
        error: { message: 'Failed to send' } as ErrorResponse,
      } as CreateEmailResponse);

      const result = await emailsService.sendNotification(
        '<p>Hello</p>',
        'Test Subject',
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith({
        message: 'Failed to send',
      });
      expect(result).toBe(false);

      consoleErrorSpy.mockRestore();
    });
  });
});
