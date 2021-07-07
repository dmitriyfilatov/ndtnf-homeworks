import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BooksCommentService } from './books-comment.service';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookComment } from './book-comment.model';

@WebSocketGateway(80, { namespace: 'booksComments' })
export class BooksCommentGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly booksCommentService: BooksCommentService) {}

  @SubscribeMessage('addComment')
  addComment(@MessageBody() data): Observable<WsResponse> {
    return from(this.booksCommentService.create(data)).pipe(
      map((res) => {
        if (res === null) {
          throw new WsException('Comment not created');
        }

        return {
          data: 'created',
          event: 'addComment',
        };
      }),
    );
  }

  @SubscribeMessage('getAllComments')
  getAllComments(@MessageBody() data): Observable<WsResponse<BookComment[]>> {
    return from(this.booksCommentService.getAll(data)).pipe(
      map((res) => {
        if (res === null) {
          throw new WsException('Comments not found');
        }

        return { event: 'getAllComments', data: res };
      }),
    );
  }
}
