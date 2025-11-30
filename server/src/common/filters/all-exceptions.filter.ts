import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

// Bộ lọc này gom toàn bộ lỗi và trả phản hồi JSON nhất quán
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const payload = exceptionResponse as { message?: unknown };
        if (Array.isArray(payload.message)) {
          message = payload.message.map((item) => String(item));
        } else if (typeof payload.message === 'string') {
          message = payload.message;
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message || message;
    }

    const logMessage = Array.isArray(message) ? message.join(', ') : message;
    this.logger.error(
      `Request ${request.method} ${request.url} failed: ${logMessage}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
