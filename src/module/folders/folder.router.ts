import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {  folderValidation } from './folder.validation';
import { folderController } from './folder.controller';

const router = express.Router();

router.post(
  '/create-folder',
  validateRequest(folderValidation.createFolderZodSchema),
  folderController.createFolder
);

router.get('/:id', folderController.getMyFolders);

router.get('/:id', folderController.getSpecificFolder);

router.delete('/:folderId', folderController.deleteFolder);

router.patch(
  '/:id',
  validateRequest(folderValidation.renameFolderSchema),
  folderController.renameFolder
);

export const FolderRoutes = router;
