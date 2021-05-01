import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

const host = process.env.MONGODB_HOST;
const port = process.env.MONGODB_PORT;
const database = process.env.MONGODB_DATABASE;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${host}:${port}/${database}`),
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
