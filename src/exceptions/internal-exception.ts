import { HttpException } from './http-exception';
export class InternalException extends HttpException {
  constructor(errorMessage: string) {
    super(500, `${errorMessage}`);
  }
}
