import { FileModel } from './file.model';
import { IFile } from './file.interface';
import { Types } from 'mongoose';

 const createFile = async (data: IFile): Promise<IFile> => {
  return await FileModel.create(data);
};


const getAllFilesByUser = async (
  userId: string,
  searchTerm?: string,
  createdAt?: string,
  from?: string,
  to?: string
): Promise<{ files: IFile[]; totalSizeMB: number }> => {
  const query: any = { userId };

  // Search by file name
  if (searchTerm) {
    query.name = { $regex: searchTerm, $options: "i" };
  }

  // Search by createdAt (specific date)
  if (createdAt) {
    const start = new Date(createdAt);
    const end = new Date(createdAt);
    end.setDate(end.getDate() + 1);
    query.createdAt = { $gte: start, $lt: end };
  }

  // Search by date range
  if (from && to) {
    query.createdAt = {
      $gte: new Date(from),
      $lte: new Date(to),
    };
  }

  const files = await FileModel.find(query);
  const totalSizeMB = files.reduce((sum, file) => sum + file.sizeMB, 0);

  return { files, totalSizeMB };
};




 const getSingleFile = async (id: string) => {
  return await FileModel.findById(id);
};

 const getFilesByType = async (userId: string, type: string): Promise<IFile[]> => {
  return await FileModel.find({ userId, type });
};

 const deleteFile = async (fileId: string): Promise<IFile | null> => {
  return await FileModel.findByIdAndDelete(fileId)
};

const renameFile = async (
  fileId: string,
  newName: string,
): Promise<IFile | null> => {
  return await FileModel.findByIdAndUpdate(
    fileId,
    { name: newName },
    { new: true }
  );
};

const duplicateFile = async (fileId: string): Promise<IFile | null> => {
  const original = await FileModel.findById(fileId);
  if (!original) return null;

  const duplicated = await FileModel.create({
    name: `${original.name} (copy)`,
    url: original.url,
    content: original.content,
    title: original.title,
    type: original.type,
    sizeMB: original.sizeMB,
    folderId: original.folderId,
    userId: original.userId,
  });

  return duplicated;
};


export const fileServices = {
    createFile, getAllFilesByUser, getFilesByType , deleteFile, getSingleFile, renameFile, duplicateFile
}