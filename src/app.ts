import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { Controller } from './interfaces/controller.interface';
import { connectMongo } from './connect-db';
import { errorMiddleware } from './middleware/error.middleware';

class App {
  public app: Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.connectToTheDatabase();
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

  private connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_DBNAME
    } = process.env;
    //mongodb+srv://<username>:<password>@cluster0-23rda.mongodb.net/test?retryWrites=true&w=majority
    const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-23rda.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`;
    connectMongo({ uri });
  }
}

export default App;
