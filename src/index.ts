import express from "express";
import { charactersRouter } from "./routes/character";
import { housesRouter } from "./routes/houses";

const app = express();
app.use(express.json());

const PORT = 4000;

app.use("/api/characters", charactersRouter);

app.use("/api/houses", housesRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
