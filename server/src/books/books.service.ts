import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateBookDto from './dto/create-book.dto';
import UpdateBookDto from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.model';
import { Model } from 'mongoose';
import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    private readonly firestoreService: FirestoreService,
  ) {}

  async getById(id: string) {
    const ref = this.firestoreService.db.collection('books').doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      throw new HttpException('book not created', HttpStatus.BAD_REQUEST);
    }

    return doc.data();
  }

  async getAll() {
    let allBooks = [];
    const snapshot = await this.firestoreService.db.collection('books').get();
    snapshot.forEach((doc) => {
      allBooks.push(doc.data());
    });

    return allBooks;
  }

  async create(bookData: CreateBookDto) {
    const res = await this.firestoreService.db.collection('books').add({
      ...bookData,
    });

    if (!res.id) {
      throw new HttpException('book not created', HttpStatus.BAD_REQUEST);
    }

    const ref = this.firestoreService.db.collection('books').doc(res.id);
    const doc = await ref.get();

    if (!doc.exists) {
      throw new HttpException('book not created', HttpStatus.BAD_REQUEST);
    }

    return doc.data();
  }

  async update(id: string, bookData: UpdateBookDto) {
    const ref = this.firestoreService.db.collection('books').doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      throw new HttpException('book not created', HttpStatus.BAD_REQUEST);
    }
    await ref.update({ ...bookData });

    return (await ref.get()).data();
  }

  async delete(id: string) {
    const ref = this.firestoreService.db.collection('books').doc(id);
    return (await ref.delete()) ? true : false;
  }
}
