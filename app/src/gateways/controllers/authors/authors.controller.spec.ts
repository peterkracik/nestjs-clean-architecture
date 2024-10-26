import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { CreateAuthorUseCase } from '@domain/use-cases/authors/create-author.usecase';
import { GetAuthorByIdUseCase } from '@domain/use-cases/authors/get-author-by-id.usecase';
import { GetAllAuthorsUseCase } from '@domain/use-cases/authors/get-all-authors.usecase';
import { NotFoundException } from '@gateways/exceptions/not-found.exception';
import { CouldNotCreateException } from '@gateways/exceptions/could-not-create.exception';
import { AuthGuard } from '@gateways/guards/auth.guard';
import { AuthorDto } from './dtos/author.dto';
import { CreateAuthorDto } from './dtos/create-author.dto';

describe('AuthorsController', () => {
  let authorsController: AuthorsController;
  let createAuthorUseCase: CreateAuthorUseCase;
  let getAuthorByIdUseCase: GetAuthorByIdUseCase;
  let getAllAuthorsUseCase: GetAllAuthorsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        {
          provide: CreateAuthorUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAuthorByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAllAuthorsUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    authorsController = module.get<AuthorsController>(AuthorsController);
    createAuthorUseCase = module.get<CreateAuthorUseCase>(CreateAuthorUseCase);
    getAuthorByIdUseCase =
      module.get<GetAuthorByIdUseCase>(GetAuthorByIdUseCase);
    getAllAuthorsUseCase =
      module.get<GetAllAuthorsUseCase>(GetAllAuthorsUseCase);
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const authors = [{ id: 1, firstName: 'Test', lastName: 'Author' }];
      const result: AuthorDto[] = [...authors];
      jest.spyOn(getAllAuthorsUseCase, 'execute').mockResolvedValue(authors);

      expect(await authorsController.findAll()).toStrictEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single author', async () => {
      const authorId = 1;
      const result: AuthorDto = {
        id: authorId,
        firstName: 'Test',
        lastName: 'Author',
      };
      jest.spyOn(getAuthorByIdUseCase, 'execute').mockResolvedValue(result);

      expect(await authorsController.findOne(authorId)).toBe(result);
    });

    it('should throw a NotFoundException', async () => {
      const authorId = 1;
      jest
        .spyOn(getAuthorByIdUseCase, 'execute')
        .mockRejectedValue(new Error('Not found'));

      await expect(authorsController.findOne(authorId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create and return an author', async () => {
      const createAuthorDto: CreateAuthorDto = {
        firstName: 'New',
        lastName: 'Author',
      };
      const result: AuthorDto = { id: 1, ...createAuthorDto };
      jest.spyOn(createAuthorUseCase, 'execute').mockResolvedValue(result);

      expect(await authorsController.create(createAuthorDto)).toBe(result);
    });

    it('should throw a CouldNotCreateException', async () => {
      const createAuthorDto: CreateAuthorDto = {
        firstName: 'New',
        lastName: 'Author',
      };
      jest
        .spyOn(createAuthorUseCase, 'execute')
        .mockRejectedValue(new Error('Could not create'));

      await expect(authorsController.create(createAuthorDto)).rejects.toThrow(
        CouldNotCreateException,
      );
    });
  });
});
