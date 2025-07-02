import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { folderServices } from './folder.service';

 const createFolder = catchAsync(async (req: Request, res: Response) => {
  const result = await folderServices.createFolder(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Folder created successfully',
    data: result,
  });
});

 const getMyFolders = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = await folderServices.getUserFolders(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Folders retrieved successfully',
    data: result,
  });
});

 const getSpecificFolder = catchAsync(async (req: Request, res: Response) => {
  const folderId = req.params.id;
  const result = await folderServices.getUserFolders(folderId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Folders retrieved successfully',
    data: result,
  });
});

 const deleteFolder = catchAsync(async (req: Request, res: Response) => {
  const folderId = req.params.folderId;
  const result = await folderServices.deleteFolder(folderId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Folder deleted successfully',
    data: result,
  });
});

 const renameFolder = catchAsync(async (req: Request, res: Response) => {
  const folderId = req.params.id;
  const { name } = req.body;
  const result = await folderServices.renameFolder(folderId, name);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Folder renamed successfully',
    data: result,
  });
});

export const folderController = {
    createFolder,
    getMyFolders,
    deleteFolder, 
    renameFolder,
     getSpecificFolder
}