import { GetAllBooksUseCase } from './get-all-books.usecase';
import { IBooksRepository } from '@domain/repositories/books-repository.interface';
import { IBook } from '@domain/interfaces/book.interface';
import { Book } from '@domain/entities/book';

describe('GetAllBooksUseCase', () => {
  let getAllBooksUseCase: GetAllBooksUseCase;
  let booksRepository: IBooksRepository;

  beforeEach(() => {
    booksRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      add: jest.fn(),
    };

    getAllBooksUseCase = new GetAllBooksUseCase(booksRepository);
  });

  describe('execute', () => {
    it('should return an array of book instances', async () => {
      const booksData: IBook[] = [
        {
          id: 1,
          title: 'Book One',
          author: { id: 1, firstName: 'Author', lastName: 'One' },
        },
        {
          id: 2,
          title: 'Book Two',
          author: { id: 2, firstName: 'Author', lastName: 'Two' },
        },
      ];
      jest.spyOn(booksRepository, 'findAll').mockResolvedValue(booksData);

      const result = await getAllBooksUseCase.execute();

      expect(result).toHaveLength(booksData.length);
      result.forEach((book, index) => {
        expect(book).toBeInstanceOf(Book);
        expect(book).toMatchObject(booksData[index]);
      });
      expect(booksRepository.findAll).toHaveBeenCalled();
    });

    it('should return an empty array if no books are found', async () => {
      jest.spyOn(booksRepository, 'findAll').mockResolvedValue([]);

      const result = await getAllBooksUseCase.execute();

      expect(result).toEqual([]);
      expect(booksRepository.findAll).toHaveBeenCalled();
    });
  });
});
