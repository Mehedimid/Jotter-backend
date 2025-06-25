import { z } from 'zod';

const passwordSchema = z
  .string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
  .min(6, 'Password must be at least 6 characters long')
  .max(50, 'Password must not exceed 50 characters')
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Password must contain at least one number',
  })
  .refine((password) => /[@$!%*?&]/.test(password), {
    message: 'Password must contain at least one special character (@$!%*?&)',
  });

export const userValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long')
    .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),

  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Invalid email format'),

  password: passwordSchema,

  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
    })
    .min(18, 'Age must be at least 18 years old')
    .max(100, 'Age must be at most 100 years old')
    .positive()
    .optional(),

  photo: z.string().url('Photo must be a valid URL').optional(),
});

export const userValidation = { userValidationSchema };
