import { Router } from "express";
import UserController from "../../controllers/user.controllers.js";
import handleValidation from "../../middlewares/validationHandler.js";
import userValidationSchema from "../../middlewares/userValidation.js";

const userRouter = Router();

// GET Method
userRouter.get('/', UserController.getAllUsers);

userRouter.get('/:userId', UserController.getUserById);

userRouter.get('/name/:userName', UserController.getUserByName);

userRouter.get('/email/:email', UserController.getUserByEmail);

// POST Method
userRouter.post('/', userValidationSchema, handleValidation, UserController.createUser);

export default userRouter;