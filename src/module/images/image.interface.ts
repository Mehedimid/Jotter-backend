import { Types } from 'mongoose';

export type TImage = {
  name: string;
  url: string;
  sizeMB: number;            // storage tracking
  folderId?: Types.ObjectId; // optional (can be root-level)
  userId: Types.ObjectId;    // owner of the image
  createdAt?: Date;
  updatedAt?: Date;
};
