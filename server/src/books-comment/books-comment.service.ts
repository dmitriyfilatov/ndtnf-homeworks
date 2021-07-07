import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookComment, BookCommentDocument } from './book-comment.model';

@Injectable()
export class BooksCommentService {
  constructor(
    @InjectModel(BookComment.name)
    private BookModel: Model<BookCommentDocument>,
  ) {}

  async create(bookCommentData: BookComment): Promise<BookComment> {
    const newBookComment = new this.BookModel(bookCommentData);
    try {
      await newBookComment.save();
      return newBookComment;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(bookId: string): Promise<BookComment[]> {
    return this.BookModel.find({ bookId });
  }
}
