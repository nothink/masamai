import express, { Application } from "express";
import cors from "cors";

class App {
  public app: Application;

  constructor() {
    this.app = express();

    this.app.use(express.json({ limit: "200mb" }));
    this.app.use(express.urlencoded({ limit: "200mb", extended: true }));
    this.app.use(cors());
  }
}

export default new App().app;
