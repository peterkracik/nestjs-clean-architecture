// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config(['.env.test']);

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('Books (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET books', async () => {
    const response = await request(app.getHttpServer())
      .get('/books')
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('/GET books/:id', async () => {
    // Assuming there's a book with ID 1 in your test database
    const response = await request(app.getHttpServer())
      .get('/books/1')
      .expect(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('/GET books/:id - Not Found', async () => {
    await request(app.getHttpServer())
      .get('/books/999') // Assuming 999 does not exist
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Book with id 999 not found',
      });
  });

  it('/POST books', async () => {
    const newBook = { title: 'New Book', author: 1 }; // Assuming author ID 1 exists
    const response = await request(app.getHttpServer())
      .post('/books')
      .send(newBook)
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(Number),
      title: 'New Book',
      author: expect.any(Object), // Adjust this based on your DTO structure
    });
  });

  it('/POST books - missing fields', async () => {
    const incompleteBook = { title: 'Incomplete Book' }; // Missing author
    await request(app.getHttpServer())
      .post('/books')
      .send(incompleteBook)
      .expect(400); // Assuming your DTO validation returns 400 for missing fields
  });

  afterAll(async () => {
    await app.close();
  });
});
