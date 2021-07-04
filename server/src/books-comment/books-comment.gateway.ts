import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BooksCommentService } from './books-comment.service';

@WebSocketGateway()
export class BooksCommentGateway {
  constructor(private readonly booksCommentService: BooksCommentService) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('BooksCommentGateway');

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
