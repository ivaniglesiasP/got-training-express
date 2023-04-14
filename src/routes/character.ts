import { Router } from "express";
import * as characterService from "../services/characterServices";
import { Character, NewCharacterEntry } from "../types";
import { toNewCharacterEntry } from "../validations";

export const charactersRouter = Router();

charactersRouter.use((req, res, next) => {
  const { hostname } = req;

  if (hostname !== "localhost") return res.status(403).send("Not valid host bla...bla...");
  console.log(`New entry from ${req.ip} at host ${hostname}`);
  next();
});

charactersRouter.get("/", (_req, res) => {
  res.status(200).json(characterService.getAllCharacters());
});

charactersRouter.get("/:id", (req, res) => {
  const character = characterService.findById(+req.params.id);

  if (!character) return res.status(404).send("Character not found 😢");

  res.status(200).json(character);
});

charactersRouter.post("/", (req, res) => {
  try {
    const newCharacterEntry: NewCharacterEntry = toNewCharacterEntry(req.body);
    const newCharacter: Character = characterService.addCharacter(newCharacterEntry);
    res.status(200).json(newCharacter);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

charactersRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const response = characterService.deleteById(+id);

  if (!response) return res.status(404).send("Character not found 😢");
  res.status(200).send(response);
});
