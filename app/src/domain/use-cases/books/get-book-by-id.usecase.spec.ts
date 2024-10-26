import { GetBookByIdUseCase } from './get-book-by-id.usecase';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';
import { IBook } from '@domain/interfaces/book.interface';
import { Book } from '@domain/entities/book';

describe('GetBookByIdUseCase', () => {
  let getBookByIdUseCase: GetBookByIdUseCase;
  let booksRepository: IBooksRepository;

  beforeEach(() => {
    booksRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      add: jest.fn(),
    };

    getBookByIdUseCase = new GetBookByIdUseCase(booksRepository);
  });

  describe('execute', () => {
    it('should return a book if found', async () => {
      const bookId = 1;
      const bookData: IBook = {
        id: bookId,
        title: 'Test Book',
        author: { id: 1, firstName: 'Test', lastName: 'Author' },
      };
      jest.spyOn(booksRepository, 'findById').mockResolvedValue(bookData);

      const result = await getBookByIdUseCase.execute(bookId);

      expect(result).toBeInstanceOf(Book);
      expect(result).toMatchObject(bookData);
      expect(booksRepository.findById).toHaveBeenCalledWith(bookId);
    });

    it('should throw an error if the book is not found', async () => {
      const bookId = 1;
      jest.spyOn(booksRepository, 'findById').mockResolvedValue(null);

      await expect(getBookByIdUseCase.execute(bookId)).rejects.toThrow(
        `Book with id ${bookId} not found`,
      );
      expect(booksRepository.findById).toHaveBeenCalledWith(bookId);
    });
  });
});
