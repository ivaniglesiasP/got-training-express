import { Router } from "express";
import * as housesService from "../services/housesService";
import { House, NewHouseEntry } from "../types";
import { toNewHouseEntry } from "../validations";

export const housesRouter = Router();

housesRouter.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token !== "Bearer HASNC12MNS90K") return res.status(401).send("Unauthorized 😢");
  next();
});

housesRouter.get("/", (_req, res) => {
  res.status(200).json(housesService.getAllHouses());
});

housesRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const house = housesService.findById(+id);
  if (!house) return res.status(404).send("House not found 😢");
  res.status(200).json(house);
});

housesRouter.patch("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const houseToEdit = housesService.findById(+id);
    if (!houseToEdit) return res.status(404).send("House not found 😢");
    const newHouseData: any = req.body;
    const newHouseEntry: NewHouseEntry = toNewHouseEntry(
      Object.entries(newHouseData).map(([key, value]) => ({ ...houseToEdit, [key]: value }))[0],
    );
    const house: House = housesService.editHouse(+id, newHouseEntry);
    res.status(200).json(house);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

//HASNC12MNS90K -> token
//req.headers.authorization -> obtener auth de la request
//Bearer HASNC12MNS90K -> El auth de la request tiene que ser igual a esta cadena
