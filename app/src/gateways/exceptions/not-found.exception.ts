import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
