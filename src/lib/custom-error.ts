export class CustomError extends Error {
    public code: string | undefined;
  
    constructor(message: string, code: string = '500') {
      super(message);
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
      this.code = code;
    }
  }