import {
  ArgumentsHost,
  ExceptionFilter,
  Catch,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    console.log(exception.getResponse());
    response.status(status).json({
      status: 'fail',
      code: status,
      timestamp: new Date().toISOString(),
      data: exception.getResponse()['message'] ?? null,
    });
  }
}
