import { GetAllAuthorsUseCase } from './get-all-authors.usecase';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { IAuthor } from '@domain/interfaces/author.interface';
import { Author } from '@domain/entities/author';

describe('GetAllAuthorsUseCase', () => {
  let getAllAuthorsUseCase: GetAllAuthorsUseCase;
  let authorsRepository: IAuthorsRepository;

  beforeEach(() => {
    authorsRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      add: jest.fn(),
    };

    getAllAuthorsUseCase = new GetAllAuthorsUseCase(authorsRepository);
  });

  describe('execute', () => {
    it('should return an array of author instances', async () => {
      const authorsData: IAuthor[] = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' },
      ];
      jest.spyOn(authorsRepository, 'findAll').mockResolvedValue(authorsData);

      const result = await getAllAuthorsUseCase.execute();

      expect(result).toHaveLength(authorsData.length);
      result.forEach((author, index) => {
        expect(author).toBeInstanceOf(Author);
        expect(author).toMatchObject(authorsData[index]);
      });
      expect(authorsRepository.findAll).toHaveBeenCalled();
    });

    it('should return an empty array if no authors are found', async () => {
      jest.spyOn(authorsRepository, 'findAll').mockResolvedValue([]);

      const result = await getAllAuthorsUseCase.execute();

      expect(result).toEqual([]);
      expect(authorsRepository.findAll).toHaveBeenCalled();
    });
  });
});

