// source: https://stackoverflow.com/a/32749533/4377800
class Exception extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

export class BadRequestException extends Exception {}
export class UserNotFoundException extends Exception {}
export class InvalidCredentialsException extends Exception {}
export class InternalServerError extends Exception {}
