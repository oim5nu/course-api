import { ICourse } from '../courses/course.interface';

export interface IStudent extends Document {
  id: string;
  name: string;
  courses: ICourse[];
}
