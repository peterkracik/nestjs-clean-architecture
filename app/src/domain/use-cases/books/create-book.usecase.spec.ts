import { CreateBookUseCase } from './create-book.usecase';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { INotificationsService } from '@domain/services/notifications-service.interface';
import { IBook } from '@domain/interfaces/book.interface';
import { Author } from '@domain/entities/author';
import { Book } from '@domain/entities/book';

describe('CreateBookUseCase', () => {
  let createBookUseCase: CreateBookUseCase;
  let booksRepository: IBooksRepository;
  let authorsRepository: IAuthorsRepository;
  let notificationService: INotificationsService;

  beforeEach(() => {
    booksRepository = {
      add: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    authorsRepository = {
      findAll: jest.fn(),
      add: jest.fn(),
      findById: jest.fn(),
    };

    notificationService = {
      sendNotification: jest.fn(),
    };

    createBookUseCase = new CreateBookUseCase(
      booksRepository,
      authorsRepository,
      notificationService,
    );
  });

  describe('execute', () => {
    it('should create a book and send a notification', async () => {
      const payload = { title: 'New Book', author: 1 };
      const authorData = { id: 1, firstName: 'Author', lastName: 'One' };
      const createdBookData: IBook = {
        id: 1,
        title: 'New Book',
        author: authorData,
      };

      jest.spyOn(authorsRepository, 'findById').mockResolvedValue(authorData);
      jest.spyOn(booksRepository, 'add').mockResolvedValue(createdBookData);

      const result = await createBookUseCase.execute(payload);

      expect(result).toBeInstanceOf(Book);
      expect(result).toMatchObject(createdBookData);
      expect(authorsRepository.findById).toHaveBeenCalledWith(payload.author);
      expect(booksRepository.add).toHaveBeenCalledWith(expect.any(Book));
      expect(notificationService.sendNotification).toHaveBeenCalledWith(
        `Book ${result.title} has been created with id ${result.id}`,
        'New book created',
      );
    });

    it('should throw an error if the author is not found', async () => {
      const payload = { title: 'New Book', author: 1 };

      jest.spyOn(authorsRepository, 'findById').mockResolvedValue(null);

      await expect(createBookUseCase.execute(payload)).rejects.toThrow(
        'Author not found',
      );
      expect(authorsRepository.findById).toHaveBeenCalledWith(payload.author);
      expect(booksRepository.add).not.toHaveBeenCalled();
      expect(notificationService.sendNotification).not.toHaveBeenCalled();
    });

    it('should throw an error if the book could not be created', async () => {
      const payload = { title: 'New Book', author: 1 };
      const authorData = { id: 1, firstName: 'Author', lastName: 'One' };

      jest.spyOn(authorsRepository, 'findById').mockResolvedValue(authorData);
      jest.spyOn(booksRepository, 'add').mockResolvedValue(null);

      await expect(createBookUseCase.execute(payload)).rejects.toThrow(
        'Could not create book',
      );
      expect(authorsRepository.findById).toHaveBeenCalledWith(payload.author);
      expect(booksRepository.add).toHaveBeenCalledWith(expect.any(Book));
      expect(notificationService.sendNotification).not.toHaveBeenCalled();
    });
  });
});
