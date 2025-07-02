import { Schema } from "mongoose";

export type TFolder = {
  name: string;
  userId: Schema.Types.ObjectId;   
  createdAt?: Date;
  updatedAt?: Date;
};
