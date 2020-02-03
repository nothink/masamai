import { Request, Response } from 'express';
import { MongooseDocument } from 'mongoose';

import { WELCOME_MESSAGE } from '../constants/constants';
import { Pokemon } from '../models/pokemon.model';

export class PokeService {
  public welcomeMessage(req: Request, res: Response): void {
    if (!req) {
      res.status(400);
    }
    res.status(200).send(WELCOME_MESSAGE);
  }

  // Get All pokemon
  public getAllPokemon(req: Request, res: Response): void {
    if (!req) {
      res.status(400);
    }

    Pokemon.find({}, (error: Error, pokemon: MongooseDocument) => {
      if (error) {
        res.status(500).send(error);
      }
      res.json(pokemon);
    });
  }

  // POST new pokemon
  public addNewPokemon(req: Request, res: Response): void {
    const newPokemon = new Pokemon(req.body);
    newPokemon.save((error: Error, pokemon: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(pokemon);
    });
  }

  public deletePokemon(req: Request, res: Response): void {
    const pokemonID = req.params.id;
    Pokemon.findByIdAndDelete(pokemonID, (error: Error, deleted) => {
      if (error) {
        res.status(404).send(error);
      }
      const message = deleted ? 'Deleted successfully' : 'Pokemon not found :(';
      res.status(200).send(message);
    });
  }

  public updatePokemon(req: Request, res: Response): void {
    const pokemonId = req.params.id;
    // https://stackoverflow.com/questions/33305623/mongoose-create-document-if-not-exists-otherwise-update-return-document-in
    // upsert
    Pokemon.findByIdAndUpdate(pokemonId, req.body, (error: Error, pokemon) => {
      if (error) {
        res.send(error);
      }
      const message = pokemon ? 'Updated successfully' : 'Pokemon not found :(';
      res.send(message);
    });
  }
}
