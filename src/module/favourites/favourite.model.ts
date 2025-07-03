import { Schema, model } from "mongoose";

const FavouriteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    fileId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "File",
    },
  },
  { timestamps: true }
);

export const FavouriteModel = model("Favourite", FavouriteSchema);
