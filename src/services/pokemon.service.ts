import { Request, Response } from "express";

export class PokeService {
  public welcomeMessage(req: Request, res: Response): Response {
    if (req) {
      console.log(req);
    }
    return res.status(200).send("Welcome to pokeAPI REST by Nya ^^");
  }
}
