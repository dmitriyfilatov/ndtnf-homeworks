import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Book } from './book.model';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;
  let app: INestApplication;
  const book = {
    title: 'book',
    description: 'книжечка',
    authors: ['1', '2', '3'],
    favourite: 'favourite',
    fileCover: 'file cover',
    fileName: 'file name',
    fileBook: 'file book',
  };
  const bookId = '123';
  let service = {
    getAll: () => [book],
    getById: (bookId) => {
      return book;
    },
    create: (bookData) => book,
    update: (bookId, bookData) => {
      return book;
    },
    delete: (bookId) => 'true'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: 'mockRepository',
        },
      ],
    })
      .overrideProvider(BooksService)
      .useValue(service)
      .compile();

    controller = module.get<BooksController>(BooksController);
    app = module.createNestApplication();
    await app.init();
  });

  it('/GET books', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(service.getAll());
  });

  it('/GET book by id', () => {
    return request(app.getHttpServer())
      .get(`/books/${bookId}`)
      .expect(200)
      .expect(service.getById(bookId));
  });

  it('/POST create book', () => {
    return request(app.getHttpServer())
      .post('/books')
      .expect(200)
      .expect(service.create(book));
  });

  it('/PUT update book', () => {
    return request(app.getHttpServer())
      .put(`/books/${bookId}`)
      .expect(200)
      .expect(service.update(bookId, book));
  });

  it('/DELETE delete book', () => {
    return request(app.getHttpServer())
      .delete(`/books/${bookId}`)
      .expect(200)
      .expect(service.delete(bookId));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
