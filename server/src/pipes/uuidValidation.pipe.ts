import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  public transform(value: string, metadata: ArgumentMetadata): any {
    if (value.length > 20) {
      throw new BadRequestException(
        `Uuid validation failed: ${value} length > 20`,
      );
    }

    return value;
  }
}
