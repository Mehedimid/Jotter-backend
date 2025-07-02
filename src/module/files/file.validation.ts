import { z } from 'zod';

const createFileZodSchema = z.object({

    name: z.string({ required_error: 'File name is required' }),
    url: z.string().optional(),
    content: z.string().optional(),
    title: z.string().optional(),
    type: z.enum(['image', 'pdf', 'note'], {
      required_error: 'File type is required',
    }),
    sizeMB: z.number({ required_error: 'File size is required' }),
    folderId: z.string().optional(),

});

export const fileValidation = {createFileZodSchema}
