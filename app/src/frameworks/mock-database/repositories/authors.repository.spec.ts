import { AuthorsRepository } from './authors.repository';
import { IAuthor } from '@domain/interfaces/author.interface';

describe('AuthorsRepository', () => {
  let authorsRepository: AuthorsRepository;
  let initialAuthors: IAuthor[];

  beforeEach(() => {
    initialAuthors = [
      { id: 1, firstName: 'John', lastName: 'Doe' },
      { id: 2, firstName: 'Jane', lastName: 'Smith' },
    ];

    authorsRepository = new AuthorsRepository(initialAuthors);
  });

  describe('findAll', () => {
    it('should return all authors', async () => {
      const authors = await authorsRepository.findAll();
      expect(authors).toEqual(initialAuthors);
    });
  });

  describe('add', () => {
    it('should add a new author and return it', async () => {
      const newAuthor: Partial<IAuthor> = {
        firstName: 'Alice',
        lastName: 'Johnson',
      };
      const initialAuthorsLength = initialAuthors.length;
      const addedAuthor = await authorsRepository.add(newAuthor);

      expect(addedAuthor.id).toBe(initialAuthorsLength + 1);
      expect(addedAuthor.firstName).toBe('Alice');
      expect(addedAuthor.lastName).toBe('Johnson');

      const allAuthors = await authorsRepository.findAll();
      expect(allAuthors).toHaveLength(initialAuthorsLength + 1);
      expect(allAuthors).toContainEqual(addedAuthor);
    });
  });

  describe('findById', () => {
    it('should return the author with the given id', async () => {
      const author = await authorsRepository.findById(1);
      expect(author).toEqual(initialAuthors[0]);
    });

    it('should return undefined if no author with the given id is found', async () => {
      const author = await authorsRepository.findById(999);
      expect(author).toBeUndefined();
    });
  });
});
