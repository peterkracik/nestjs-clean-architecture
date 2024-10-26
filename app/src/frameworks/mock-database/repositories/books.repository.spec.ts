import { BooksRepository } from './books.repository';
import { IBook } from '@domain/interfaces/book.interface';
import { IAuthor } from '@domain/interfaces/author.interface';

describe('BooksRepository', () => {
  let booksRepository: BooksRepository;
  let initialBooks: IBook[];

  beforeEach(() => {
    const author1: IAuthor = { id: 1, firstName: 'John', lastName: 'Doe' };
    const author2: IAuthor = { id: 2, firstName: 'Jane', lastName: 'Smith' };

    initialBooks = [
      { id: 1, title: 'Book One', author: author1 },
      { id: 2, title: 'Book Two', author: author2 },
    ];

    booksRepository = new BooksRepository(initialBooks);
  });

  describe('findAll', () => {
    it('should return all books', async () => {
      const books = await booksRepository.findAll();
      expect(books).toEqual(initialBooks);
    });
  });

  describe('add', () => {
    it('should add a new book and return it', async () => {
      const newAuthor: IAuthor = {
        id: 3,
        firstName: 'Alice',
        lastName: 'Johnson',
      };
      const newBook: Partial<IBook> = {
        title: 'Book Three',
        author: newAuthor,
      };

      const initialBooksLength = initialBooks.length;
      const addedBook = await booksRepository.add(newBook);

      expect(addedBook.id).toBe(initialBooksLength + 1);
      expect(addedBook.title).toBe('Book Three');
      expect(addedBook.author).toEqual(newAuthor);

      const allBooks = await booksRepository.findAll();
      expect(allBooks).toHaveLength(initialBooksLength + 1);
      expect(allBooks).toContainEqual(addedBook);
    });
  });

  describe('findById', () => {
    it('should return the book with the given id', async () => {
      const book = await booksRepository.findById(1);
      expect(book).toEqual(initialBooks[0]);
    });

    it('should return undefined if no book with the given id is found', async () => {
      const book = await booksRepository.findById(999);
      expect(book).toBeUndefined();
    });
  });
});
