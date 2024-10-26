import { GetAuthorByIdUseCase } from './get-author-by-id.usecase';
import { IAuthorsRepository } from '@domain/repositories/authors-repository.interface';
import { IAuthor } from '@domain/interfaces/author.interface';
import { Author } from '@domain/entities/author';

describe('GetAuthorByIdUseCase', () => {
  let getAuthorByIdUseCase: GetAuthorByIdUseCase;
  let authorsRepository: IAuthorsRepository;

  beforeEach(() => {
    authorsRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      add: jest.fn(),
    };

    getAuthorByIdUseCase = new GetAuthorByIdUseCase(authorsRepository);
  });

  describe('execute', () => {
    it('should return an author if found', async () => {
      const authorId = 1;
      const authorData: IAuthor = {
        id: authorId,
        firstName: 'Author',
        lastName: 'One',
      };
      jest.spyOn(authorsRepository, 'findById').mockResolvedValue(authorData);

      const result = await getAuthorByIdUseCase.execute(authorId);

      expect(result).toBeInstanceOf(Author);
      expect(result).toMatchObject(authorData);
      expect(authorsRepository.findById).toHaveBeenCalledWith(authorId);
    });

    it('should throw an error if the author is not found', async () => {
      const authorId = 1;
      jest.spyOn(authorsRepository, 'findById').mockResolvedValue(null);

      await expect(getAuthorByIdUseCase.execute(authorId)).rejects.toThrow(
        'Author not found',
      );
      expect(authorsRepository.findById).toHaveBeenCalledWith(authorId);
    });
  });
});
