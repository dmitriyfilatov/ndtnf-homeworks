import { Module } from '@nestjs/common';
import { BooksCommentService } from './books-comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookComment, BookCommentSchema } from './book-comment.model';
import { BooksCommentGateway } from './books-comment.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookComment.name, schema: BookCommentSchema },
    ]),
  ],
  providers: [BooksCommentService, BooksCommentGateway],
})
export class BooksCommentModule {}
