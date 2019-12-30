import { ICourse } from '../courses/course.interface';

export interface IStudent {
  name: string;
  courses?: ICourse[];
}
