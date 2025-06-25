import { NextFunction, Request, Response, Router } from 'express';
import { userController } from './user.controller';
import { Schema } from 'zod';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const userRouter = Router();

userRouter.get('/:userId', userController.getSingleUser);

userRouter.get('/', userController.getUser);

userRouter.post(
  '/create-user',
  validateRequest(userValidation.userValidationSchema),
  userController.createUser,
);

userRouter.put('/:userId', userController.updateUser);

userRouter.delete('/:userId', userController.deleteUser);

export default userRouter;
