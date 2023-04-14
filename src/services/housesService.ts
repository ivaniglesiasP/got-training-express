import housesData from "../../DB/houses.json";
import { House, NewHouseEntry } from "../types";

const houses: House[] = housesData as House[];

//read all houses
export const getAllHouses = () => houses;

//real by id
export const findById = (id: number): House | null => {
  const house = houses.find((house) => house.id === id);
  return house ? house : null;
};

export const editHouse = (id: number, newHouseEntry: NewHouseEntry): House => {
  const houseIndex = houses.findIndex((house) => house.id === id);
  const house: House = {
    id: id,
    ...newHouseEntry,
  };
  houses[houseIndex] = house;
  return house;
};
