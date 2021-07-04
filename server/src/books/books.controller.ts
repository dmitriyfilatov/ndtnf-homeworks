import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  UseInterceptors,
  UseFilters, NotFoundException,
} from '@nestjs/common';
import FindOneParams from '../utils/find-one-params';
import { Book } from './book.model';
import { BooksService } from './books.service';
import CreateBookDto from './dto/create-book.dto';
import UpdateBookDto from './dto/update-book.dto';
import { ExceptionInterceptor } from '../interceptors/ExceptionInterceptor';
import { UuidValidationPipe } from '../pipes/uuidValidation.pipe';
import { BodyValidationPipe } from '../pipes/bodyValidation.pipe';
import { BooksCreateDto } from '../joiSchemas/books-create-dto';
import {NotFoundExceptionFilter} from "../filtres/NotFoundExceptionFilter";

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @UseInterceptors(ExceptionInterceptor)
  async getAll(): Promise<Book[]> {
    throw new HttpException('some important reason', HttpStatus.BAD_REQUEST);
    return this.booksService.getAll();
  }

  @Get(':id')
  async getById(
    @Param('id', UuidValidationPipe) { id }: FindOneParams,
  ): Promise<Book> {
    return this.booksService.getById(id);
  }

  @Post()
  @HttpCode(200)
  @UsePipes(new BodyValidationPipe(BooksCreateDto))
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
  @UseFilters(new NotFoundExceptionFilter())
  async delete(@Param() { id }: FindOneParams): Promise<boolean> {
    throw new NotFoundException('Not found id');
    return this.booksService.delete(id);
  }
}
