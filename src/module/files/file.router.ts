import express from 'express';
import { fileController } from './file.controller';
import validateRequest from '../../middlewares/validateRequest';
import { fileValidation } from './file.validation';

const router = express.Router();

router.post(
  '/create-file/:userId',
  validateRequest(fileValidation.createFileZodSchema),
  fileController.createFile
);

// Get all files for a user
router.get('/:userId', fileController.getMyFiles);

// Get all files of a specific type for a user
router.get('/:userId/type/:type', fileController.getFilesByType);

// Get single file by file ID
router.get('/single/:id', fileController.getSingleFile);

// Delete a file by ID
router.delete('/:id', fileController.deleteFile);

// Rename a file by ID
router.patch('/:id', fileController.renameFile);

// Duplicate a file by ID
router.post('/duplicate/:id', fileController.duplicateFile);

export const FileRoutes = router;
