import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class BodyValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  public transform(value: any, metadata: ArgumentMetadata): any {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Bad Validation Schema');
    }

    return value;
  }
}
