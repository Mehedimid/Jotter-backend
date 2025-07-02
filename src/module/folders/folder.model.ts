import { Schema, model } from 'mongoose';
import { TFolder } from './folder.interface';

const folderSchema = new Schema<TFolder>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FolderModel = model<TFolder>('Folder', folderSchema);
