require('dotenv').config(['.env.test']);

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('Authors (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET authors', async () => {
    const response = await request(app.getHttpServer())
      .get('/authors')
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('/GET authors/:id', async () => {
    // Assuming there's an author with ID 1 in your test database
    const response = await request(app.getHttpServer())
      .get('/authors/1')
      .expect(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('/GET authors/:id - Not Found', async () => {
    await request(app.getHttpServer())
      .get('/authors/999') // Assuming 999 does not exist
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Author not found',
      });
  });

  it('/POST authors', async () => {
    const newAuthor = { firstName: 'Alice', lastName: 'Johnson' };
    const response = await request(app.getHttpServer())
      .post('/authors')
      .set('Authorization', 'Bearer 123')
      .send(newAuthor)
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(Number),
      firstName: 'Alice',
      lastName: 'Johnson',
    });
  });

  it('/POST authors - not allowed', async () => {
    const newAuthor = { firstName: 'Alice', lastName: 'Johnson' };
    const response = await request(app.getHttpServer())
      .post('/authors')
      .send(newAuthor)
      .expect(403);

  });

  afterAll(async () => {
    await app.close();
  });
});
