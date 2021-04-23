import { Injectable } from '@nestjs/common';
import Book from './book.interface';
import CreateBookDto from './dto/create-book.dto';
import UpdateBookDto from './dto/update-book.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  async getById(id: string): Promise<Book> {
    return this.books.find((el) => el.id === id);
  }

  async getAll(): Promise<Book[]> {
    return this.books;
  }

  async create(bookData: CreateBookDto): Promise<Book> {
    const id = uuidv4();
    const book = { id, ...bookData };
    console.log(this.books);
    this.books.push(book);
    return book;
  }

  async update(id: string, bookData: UpdateBookDto): Promise<Book> {
    const idx = this.books.findIndex((el) => el.id === id);
    if (idx !== -1) {
      this.books[idx] = {
        ...this.books[idx],
        ...bookData
      };
    }
    return this.books.find((el) => el.id === id);
  }

  async delete(id: string): Promise<boolean> {
    const idx = this.books.findIndex((el) => el.id === id);
    if (idx !== -1) {
      this.books.slice(idx, 1);
      return true;
    }

    return false;
  }
}
