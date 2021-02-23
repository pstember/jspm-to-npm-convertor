import { CustomError } from './custom-error';

export class InternalError extends CustomError {
  private static ERROR_CODE = '500';
  private static ERROR_MESSAGE = 'Internal error';

  constructor(userMessage: string) {
    super(userMessage || InternalError.ERROR_MESSAGE, InternalError.ERROR_CODE);
  }
}