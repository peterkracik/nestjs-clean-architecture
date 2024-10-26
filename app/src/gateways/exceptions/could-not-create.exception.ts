import { HttpException, HttpStatus } from '@nestjs/common';

export class CouldNotCreateException extends HttpException {
  constructor(message: string = 'Failed to create a record') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
