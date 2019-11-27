import express, { Request, Response, NextFunction } from 'express';
import { Controller } from '../interfaces/controller.interface';
import { ICourse } from './course.interface';
import { CourseModel } from './course.model';
import { NotFoundException } from '../exceptions/not-found.exception';
import { InternalException } from '../exceptions/internal-exception';

export default class CourseController implements Controller {
  public path = '/api/courses';
  public router = express.Router();
  private course = CourseModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllCourses);
    this.router.post(this.path, this.createCourse);
    this.router.patch(`${this.path}/:id`, this.modifyCourse);
  }

  private createCourse = (req: Request, res: Response, next: NextFunction) => {
    const postData: ICourse = req.body;
    const createdPost = new this.course({
      ...postData
    });
    createdPost
      .save()
      .then(savedPost => {
        res.send(savedPost);
      })
      .catch(error => {
        return next(new InternalException(error.message));
      });
  };

  private modifyCourse = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updateData = req.body;

    this.course
      .findByIdAndUpdate(id, { ...updateData }, { new: true })
      .then(course => {
        if (course) {
          res.send(course);
        } else {
          next(new NotFoundException(id));
        }
      })
      .catch(error => {
        return next(new InternalException(error.message));
      });
  };

  private getAllCourses = (req: Request, res: Response, next: NextFunction) => {
    this.course
      .find()
      .then(courses => {
        res.send(courses);
      })
      .catch(error => {
        return next(new InternalException(error.message));
      });
  };
}
