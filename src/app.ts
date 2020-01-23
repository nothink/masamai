import express, { Application } from "express";
import cors from "cors";

import { Controller } from "./main.controller";

class App {
  public app: Application;
  public pokeController: Controller;

  constructor() {
    this.app = express();

    this.app.use(express.json({ limit: "200mb" }));
    this.app.use(express.urlencoded({ limit: "200mb", extended: true }));
    this.app.use(cors());

    this.pokeController = new Controller(this.app);
  }
}

export default new App().app;
