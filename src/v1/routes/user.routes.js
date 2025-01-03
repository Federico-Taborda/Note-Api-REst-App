import { Router } from "express";
import { validate } from "express-validation";
import UserController from "../../controllers/user.controllers.js";
import userValidation from "../../middlewares/userValidation.js";

const userRouter = Router();

// GET Method
userRouter.get('/', UserController.getAllUsers);

userRouter.get('/:userId', UserController.getUserById);

userRouter.get('/name/:userName', UserController.getUserByName);

userRouter.get('/email/:email', UserController.getUserByEmail);

// POST Method
userRouter.post('/', validate(userValidation), UserController.createUser);

export default userRouter;