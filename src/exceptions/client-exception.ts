import { HttpException } from './http-exception';
export class ClientException extends HttpException {
  constructor(errorMessage: string) {
    super(500, `${errorMessage}`);
  }
}
