import { Router } from "express";
import { validate } from "express-validation";
import UserController from "../../controllers/user.controllers.js";
import userValidation from "../../middlewares/userValidation.js";

const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);

userRouter.get('/:userId', UserController.getUserById);

userRouter.post('/', validate(userValidation), UserController.createUser);

export default userRouter;