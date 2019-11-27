import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { Controller } from './interfaces/controller.interface';
import { connectMongo } from './connect-db';
import { errorMiddleware } from './middleware/error.middleware';

class App {
  public app: Application;

  constructor(controllers: Controller[], dbUri: string) {
    this.app = express();
    this.connectToTheDatabase(dbUri);
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private initializeMiddlewares() {
    // for requests with data in json format
    this.app.use(bodyParser.json({ limit: '50mb' }));

    // for requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    //Enables cors
    this.app.use(cors());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  private connectToTheDatabase(dbUri: string) {
    // const {
    //   MONGO_USER,
    //   MONGO_PASSWORD,
    //   MONGO_PATH
    // } = process.env;
    // const dbPath = MONGO_PATH || `mongodb://localhost:27017/test`;
    connectMongo({ dbUri });
  }
}

export default App;
