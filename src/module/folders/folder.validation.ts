import { z } from 'zod';

 const createFolderZodSchema = z.object({
  name: z
    .string({
      required_error: 'Folder name is required',
    })
    .min(1, 'Folder name must not be empty'),

  userId: z
    .string({
      required_error: 'User ID is required',
    }),
});



 const renameFolderSchema = z.object({
  name: z
    .string({
      required_error: 'Folder name is required',
    })
    .min(1, 'Folder name must not be empty'),

});


export const folderValidation  = {createFolderZodSchema, renameFolderSchema}