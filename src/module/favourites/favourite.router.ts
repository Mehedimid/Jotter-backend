import express from "express";
import {
  addToFavourite,
  removeFromFavourite,
  getFavourites,
} from "./favourite.controller";

export const favouriteRoutes = express.Router();

favouriteRoutes.post("/:userId", addToFavourite);
favouriteRoutes.delete("/remove/:fileId", removeFromFavourite);
favouriteRoutes.get("/:userId", getFavourites);

