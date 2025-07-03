import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { fileServices } from './file.services';

 const createFile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const fileData = { ...req.body, userId };
  const result = await fileServices.createFile(fileData);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'File uploaded successfully',
    data: result,
  });
});



const getMyFiles = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const searchTerm = req.query.searchTerm?.toString();
  const createdAt = req.query.createdAt?.toString();
  const from = req.query.from?.toString();
  const to = req.query.to?.toString();

  const { files, totalSizeMB } = await fileServices.getAllFilesByUser(
    userId,
    searchTerm,
    createdAt,
    from,
    to
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Files retrieved successfully',
    data: {
      files,
      totalSizeMB,
    },
  });
});




 const getFilesByType = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const type = req.params.type;
  const result = await fileServices.getFilesByType(userId, type);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: `${type} files retrieved successfully`,
    data: result,
  });
});

 const getSingleFile = catchAsync(async (req: Request, res: Response) => {
  const fileId = req.params.id;
  const result = await fileServices.getSingleFile(fileId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Single file retrieved successfully',
    data: result,
  });
});

 const deleteFile = catchAsync(async (req: Request, res: Response) => {
  const fileId = req.params.id;
  const result = await fileServices.deleteFile(fileId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'File deleted successfully',
    data: result,
  });
});

 const renameFile = catchAsync(async (req: Request, res: Response) => {
  const fileId = req.params.id;
  const { name } = req.body;
  const result = await fileServices.renameFile(fileId, name);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'File renamed successfully',
    data: result,
  });
});

export const duplicateFile = catchAsync(async (req: Request, res: Response) => {
  const fileId = req.params.id;
  const result = await fileServices.duplicateFile(fileId);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'File duplicated successfully',
    data: result,
  });
});


export const fileController = {
    createFile, getFilesByType, getMyFiles, getSingleFile, renameFile, deleteFile, duplicateFile }