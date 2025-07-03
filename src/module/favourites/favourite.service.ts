import { FavouriteModel } from "./favourite.model";

const addToFavourite = async (userId: string, fileId: string) => {
  const exists = await FavouriteModel.findOne({ userId, fileId });
  if (exists) {
   throw Error ("File already existed in favourites")
  }
  return await FavouriteModel.create({ userId, fileId });
};

const removeFromFavourite = async ( fileId: string) => {
  return await FavouriteModel.findOneAndDelete({fileId})
};

const getUserFavourites = async (userId: string) => {
  return await FavouriteModel.find({userId}).populate("fileId", "-_id").lean()
};

export const favouriteService = {
  addToFavourite,
  removeFromFavourite,
  getUserFavourites,
};
