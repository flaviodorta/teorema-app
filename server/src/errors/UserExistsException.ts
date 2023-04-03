import { ConflictException, HttpStatus } from '@nestjs/common';

export class UserExistsException extends ConflictException {
  constructor() {
    super('User already exists');
  }
}
