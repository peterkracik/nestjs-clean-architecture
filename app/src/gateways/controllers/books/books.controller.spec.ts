import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { CreateBookUseCase } from '@domain/use-cases/books/create-book.usecase';
import { GetBookByIdUseCase } from '@domain/use-cases/books/get-book-by-id.usecase';
import { GetAllBooksUseCase } from '@domain/use-cases/books/get-all-books.usecase';
import { NotFoundException } from '@gateways/exceptions/not-found.exception';
import { CouldNotCreateException } from '@gateways/exceptions/could-not-create.exception';
import { BookDto } from './dtos/book.dto';
import { CreateBookDto } from './dtos/create-book.dto';

describe('BooksController', () => {
  let booksController: BooksController;
  let createBookUseCase: CreateBookUseCase;
  let getBookByIdUseCase: GetBookByIdUseCase;
  let getAllBooksUseCase: GetAllBooksUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: CreateBookUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetBookByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAllBooksUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    createBookUseCase = module.get<CreateBookUseCase>(CreateBookUseCase);
    getBookByIdUseCase = module.get<GetBookByIdUseCase>(GetBookByIdUseCase);
    getAllBooksUseCase = module.get<GetAllBooksUseCase>(GetAllBooksUseCase);
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result: BookDto[] = [];
      jest.spyOn(getAllBooksUseCase, 'execute').mockResolvedValue(result);

      expect(await booksController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      const bookId = 1;
      const result: BookDto = {
        id: bookId,
        title: 'Test Book',
        author: { id: 1, firstName: 'Test', lastName: 'Author' },
      };
      jest.spyOn(getBookByIdUseCase, 'execute').mockResolvedValue(result);

      expect(await booksController.findOne(bookId)).toBe(result);
    });

    it('should throw a NotFoundException', async () => {
      const bookId = 1;
      jest
        .spyOn(getBookByIdUseCase, 'execute')
        .mockRejectedValue(new Error('Not found'));

      await expect(booksController.findOne(bookId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create and return a book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'New Book',
        author: 1,
      };
      const result: BookDto = {
        id: 1,
        ...createBookDto,
        author: { id: 1, firstName: 'John', lastName: 'Doe' },
      };
      jest.spyOn(createBookUseCase, 'execute').mockResolvedValue(result);

      expect(await booksController.create(createBookDto)).toBe(result);
    });

    it('should throw a CouldNotCreateException', async () => {
      const createBookDto: CreateBookDto = {
        title: 'New Book',
        author: 1,
      };
      jest
        .spyOn(createBookUseCase, 'execute')
        .mockRejectedValue(new Error('Could not create'));

      await expect(booksController.create(createBookDto)).rejects.toThrow(
        CouldNotCreateException,
      );
    });
  });
});
