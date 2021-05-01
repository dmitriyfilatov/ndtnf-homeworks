import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  public title: string;

  @Prop()
  public description: string;

  @Prop()
  public authors: string[];

  @Prop()
  public favourite: string;

  @Prop()
  public fileCover: string;

  @Prop()
  public fileName: string;

  @Prop()
  public fileBook: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
