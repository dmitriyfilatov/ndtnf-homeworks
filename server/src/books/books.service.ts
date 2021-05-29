import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateBookDto from './dto/create-book.dto';
import UpdateBookDto from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.model';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>) {}

  async getById(id: string): Promise<Book> {
    const book = this.BookModel.findById(id).exec();
    if (!book) {
      throw new HttpException('book not found', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async getAll(): Promise<Book[]> {
    return this.BookModel.find().exec();
  }

  async create(bookData: CreateBookDto): Promise<Book> {
    const book = new this.BookModel(bookData);
    try {
      await book.save();
      return book;
    } catch (error) {
      throw new HttpException(
        `book not created: ${error._message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, bookData: UpdateBookDto): Promise<Book> {
    try {
      await this.BookModel.findByIdAndUpdate(id, bookData);
      return this.BookModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('book not updated', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const book = await this.BookModel.findByIdAndDelete(id);
      return book ? true : false;
    } catch (error) {
      throw new HttpException('book not deleted', HttpStatus.BAD_REQUEST);
    }
  }
}
