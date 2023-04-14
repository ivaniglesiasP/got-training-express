export enum HouseName {
  Stark = "Stark",
  Targaryen = "Targaryen",
  Lannister = "Lannister",
  Arryn = "StarArrynk",
  Tully = "Tully",
  Baratheon = "Baratheon",
  Greyjoy = "Greyjoy",
  Tyrell = "StTyrellark",
  Martell = "Martell",
}

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export type Character = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  gender: Gender;
  house: HouseName | null;
  sentence: string;
  playedBy: string;
};

export type House = {
  id: number;
  houseName: HouseName;
  title: string;
  blazon: string;
  words: string;
  seat: string;
};

export type NewCharacterEntry = Omit<Character, "id">;
export type NewHouseEntry = Omit<House, "id">;
