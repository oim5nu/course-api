import express, { Request, Response, NextFunction } from 'express';
import { Controller } from '../interfaces/controller.interface';
import { IStudent } from './student.interface';
import { StudentModel } from './student.model';
import { NotFoundException } from '../exceptions/not-found.exception';
import { InternalException } from '../exceptions/internal-exception';

export default class CourseController implements Controller {
  public path = '/api/students';
  public router = express.Router();
  private student = StudentModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.createStudent);
    this.router.get(`${this.path}/:id`, this.getOneStudent);
    this.router.get(this.path, this.getAllStudents);
  }

  private createStudent = (req: Request, res: Response, next: NextFunction) => {
    const studentData: IStudent = req.body;
    const createdStudent = new this.student(studentData)
    createdStudent
      .save()
      .then(savedStudent => {
        if (savedStudent) {
          res.send(savedStudent);
        } else {
          next(new NotFoundException(studentData.name));
        }
      })
      .catch(error => {
        return next(new InternalException(error.message));
      });
  };

  private getOneStudent = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    this.student
      .findById(id)
      .then(student => {
        if (student) {
          res.send(student);
        } else {
          next(new NotFoundException(id));
        }
      })
      .catch(error => {
        return next(new InternalException(error.message));
      });
  };

  private getAllStudents = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.student
      .find()
      .then(students => {
        res.send(students);
      })
      .catch(error => {
        return next(new InternalException(error.message));
      });
  };
}
