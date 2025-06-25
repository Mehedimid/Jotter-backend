import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "../user/user.validation";

const authRouter = Router();

authRouter.post('/register',validateRequest(userValidation.userValidationSchema), authController.register);

export default authRouter