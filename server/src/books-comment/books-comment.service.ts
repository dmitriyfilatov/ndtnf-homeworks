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
}
