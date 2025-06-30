import { Router } from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const userRouter = Router();

userRouter.post('/create-user', validateRequest(userValidation.createUserValidationSchema), userControllers.createUser)

userRouter.get('/', userControllers.getAllUser)

userRouter.get('/:userId', userControllers.getSingleUser)

userRouter.put('/:userId', userControllers.updateUser)

export default userRouter;