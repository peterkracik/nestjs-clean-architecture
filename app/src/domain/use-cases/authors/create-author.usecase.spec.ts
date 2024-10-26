import { CreateAuthorUseCase } from './create-author.usecase';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { INotificationsService } from '@domain/services/notifications-service.interface';
import { IAuthor } from '@domain/interfaces/author.interface';
import { Author } from '@domain/entities/author';

describe('CreateAuthorUseCase', () => {
  let createAuthorUseCase: CreateAuthorUseCase;
  let authorsRepository: IAuthorsRepository;
  let notificationService: INotificationsService;

  beforeEach(() => {
    authorsRepository = {
      add: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    notificationService = {
      sendNotification: jest.fn(),
    };

    createAuthorUseCase = new CreateAuthorUseCase(
      authorsRepository,
      notificationService,
    );
  });

  describe('execute', () => {
    it('should create an author and send a notification', async () => {
      const payload = { firstName: 'John', lastName: 'Doe' };
      const createdAuthorData: IAuthor = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
      };

      jest.spyOn(authorsRepository, 'add').mockResolvedValue(createdAuthorData);

      const result = await createAuthorUseCase.execute(payload);

      expect(result).toBeInstanceOf(Author);
      expect(result).toMatchObject(createdAuthorData);
      expect(authorsRepository.add).toHaveBeenCalledWith(payload);
      expect(notificationService.sendNotification).toHaveBeenCalledWith(
        `Author ${result.firstName} ${result.lastName} has been created with id ${result.id}`,
        'New author created',
      );
    });

    it('should throw an error if the author could not be created', async () => {
      const payload = { firstName: 'John', lastName: 'Doe' };

      jest.spyOn(authorsRepository, 'add').mockResolvedValue(null);

      await expect(createAuthorUseCase.execute(payload)).rejects.toThrow(
        'Author not created',
      );
      expect(authorsRepository.add).toHaveBeenCalledWith(payload);
      expect(notificationService.sendNotification).not.toHaveBeenCalled();
    });
  });
});
