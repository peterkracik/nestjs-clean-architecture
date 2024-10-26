import { IBook } from '@domain/interfaces/book.interface';

export const booksMock: IBook[] = [
  {
    id: 1,
    title: 'The Hobbit',
    author: {
      id: 1,
      firstName: 'J.R.R.',
      lastName: 'Tolkien',
    },
  },
  {
    id: 2,
    title: 'The Lord of the Rings',
    author: {
      id: 1,
      firstName: 'J.R.R.',
      lastName: 'Tolkien',
    },
  },
  {
    id: 3,
    title: "Harry Potter and the Philosopher's Stone",
    author: {
      id: 2,
      firstName: 'J.K.',
      lastName: 'Rowling',
    },
  },
  {
    id: 4,
    title: 'Harry Potter and the Chamber of Secrets',
    author: {
      id: 2,
      firstName: 'J.K.',
      lastName: 'Rowling',
    },
  },
];
