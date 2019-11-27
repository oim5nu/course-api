import 'dotenv/config';
import App from './app';
import StudentController from './students/student.controller';
import CourseController from './courses/course.controller';
import { validateEnv } from './utils/validate-env';
validateEnv();

import { startMongoMemoryServer } from './mongo-memory';

startMongoMemoryServer().then(mongoUri => {
  const app = new App(
    [new CourseController(), new StudentController()],
    mongoUri
  );

  app.listen();
});
