import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { Controller } from './main.controller';
import { MONGO_URL } from './constants/constants';

class App {
  public app: Application;
  public pokeController: Controller;

  constructor() {
    // create and config express app
    this.app = express();
    this.app.use(express.json({ limit: '200mb' }));
    this.app.use(express.urlencoded({ limit: '200mb', extended: true }));
    this.app.use(cors());

    // setup mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.pokeController = new Controller(this.app);
  }
}

export default new App().app;
