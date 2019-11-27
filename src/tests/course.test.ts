import mongoose, { Document } from 'mongoose';
import { connect, closeDatabase, clearDatabase } from './db-handler';
import { CourseModel } from '../courses/course.model';
import { ICourse } from '../courses/course.interface';

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('Course Model', () => {
  it('should throw validation errors', () => {
    const course = new CourseModel();
    expect(course.validate).toThrow();
  });

  it('should save a course', async () => {
    expect.assertions(2);

    const course: ICourse & Document = new CourseModel({
      id: 'Test Id Name',
      name: 'Test Course Name',
      type: 'math'
    });
    const spy = jest.spyOn(course, 'save');
    course.save();

    expect(course).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String)
    });

    expect(course.type).toBe('math');
    spy.mockRestore();
  });
});
