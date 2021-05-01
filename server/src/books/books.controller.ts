import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import FindOneParams from '../utils/find-one-params';
import { Book } from './book.model';
import { BooksService } from './books.service';
import CreateBookDto from './dto/create-book.dto';
import UpdateBookDto from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAll(): Promise<Book[]> {
    return this.booksService.getAll();
  }

  @Get(':id')
  async getById(@Param() { id }: FindOneParams): Promise<Book> {
    return this.booksService.getById(id);
  }

  @Post()
  @HttpCode(200)
  async create(@Body() bookData: CreateBookDto) {
    return this.booksService.create(bookData);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param() { id }: FindOneParams,
    @Body() bookData: UpdateBookDto,
  ) {
    return this.booksService.update(id, bookData);
  }

  @Delete(':id')
  async delete(@Param() { id }: FindOneParams): Promise<boolean> {
    return this.booksService.delete(id);
  }
}
