import { Router } from "express";
import UserController from "../../controllers/user.controllers.js";
import handleValidation from "../../middlewares/validationHandler.js";
import userValidationSchema from "../../middlewares/userValidation.js";
import userRoleValidationSchema from "../../middlewares/updateUserRoleValidation.js";
import userEmailValidationSchema from "../../middlewares/updateUserEmailValidation.js";

const userRouter = Router();

// GET Method
userRouter.get('/', UserController.getAllUsers);

userRouter.get('/:userId', UserController.getUserById);

userRouter.get('/name/:userName', UserController.getUserByName);

userRouter.get('/email/:email', UserController.getUserByEmail);

userRouter.get('/role/:role', UserController.getUsersByRole);

// POST Method
userRouter.post('/', userValidationSchema, handleValidation, UserController.createUser);

// PATCH Method
userRouter.patch('/role', userRoleValidationSchema, handleValidation, UserController.updateUserRole);

userRouter.patch('/email', userEmailValidationSchema, handleValidation, UserController.updateUserEmail);

export default userRouter;