import { Schema, model } from 'mongoose';
import { IFile } from './file.interface';

const fileSchema = new Schema<IFile>(
  {
    name: { type: String, required: true },
    url: { type: String }, 
    content: { type: String } ,
    title: { type: String },   
    type: {
      type: String,
      enum: ['image', 'pdf', 'note'],
      required: true,
    },
    sizeMB: { type: Number, required: true },
    folderId: { type: Schema.Types.ObjectId, ref: 'Folder' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export const FileModel = model<IFile>('File', fileSchema);
