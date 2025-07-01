import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.post('/create-user', validateRequest(userValidation.createUserValidationSchema), userController.createUser)

userRouter.get('/', userController.getUser)

userRouter.get('/:userId', userController.getSingleUser)

userRouter.put('/:userId', userController.updateUser)

export default userRouter;