import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import validationSchema from './config';
import { FirestoreModule } from './firestore/firestore.module';

const host = process.env.MONGODB_HOST;
const port = process.env.MONGODB_PORT;
const database = process.env.MONGODB_DATABASE;

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema }),
    MongooseModule.forRoot(`mongodb://${host}:${port}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    BooksModule,
    UsersModule,
    FirestoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
