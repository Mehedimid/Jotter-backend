import { FolderModel } from './folder.model';
import { TFolder } from './folder.interface';

 const createFolder = async (payload:TFolder): Promise<TFolder> => {
  return await FolderModel.create(payload);
};

 const getUserFolders = async (userId: string): Promise<TFolder[]> => {
  return await FolderModel.find({ userId });
};

 const getSpecificFolder = async (folderId: string): Promise<TFolder | null> => {
  return await FolderModel.findById(folderId);
};

 const deleteFolder = async (folderId: string): Promise<TFolder | null> => {
  return await FolderModel.findByIdAndDelete(folderId);
};

 const renameFolder = async (
  folderId: string,
  newName: string,
) => {
  return await FolderModel.findByIdAndUpdate(
    folderId,
    { name: newName },
    { new: true }
  );
};


export const folderServices = {
    createFolder, 
    getUserFolders,
    deleteFolder,
    renameFolder,
    getSpecificFolder
}