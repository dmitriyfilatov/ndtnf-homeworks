import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookCommentDocument = BookComment & Document;

@Schema()
export class BookComment {
    @Prop()
    public bookId: string;

    @Prop()
    public comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment)