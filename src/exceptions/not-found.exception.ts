import { HttpException } from './http-exception';
export class NotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Resource ${id} not found`);
  }
}
