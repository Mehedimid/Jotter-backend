import { Schema } from "mongoose";

export type FileType = 'image' | 'pdf' | 'note';

export interface IFile {
  name: string;
  url?: string;          
  content?: string;   
  title?:string;
  type: FileType;        
  sizeMB: number;
  folderId?: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
