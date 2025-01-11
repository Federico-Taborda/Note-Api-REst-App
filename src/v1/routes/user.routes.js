import { Router } from "express";
import UserController from "../../controllers/user.controllers.js";

// Validations
import { 
    userValidationSchema, 
    userRoleValidationSchema, 
    userEmailValidationSchema, 
    deleteUserValidationSchema 
} from "../../middlewares/userValidation.js";

import handleValidation from "../../middlewares/validationHandler.js";


const userRouter = Router();

// GET Method
userRouter.get('/', UserController.getAllUsers);

userRouter.get('/id/:userId', UserController.getUserById);

userRouter.get('/name/:userName', UserController.getUserByName);

userRouter.get('/email/:email', UserController.getUserByEmail);

userRouter.get('/role/:role', UserController.getUsersByRole);

// POST Method
userRouter.post('/', userValidationSchema, handleValidation, UserController.createUser);

// PATCH Method
userRouter.patch('/role', userRoleValidationSchema, handleValidation, UserController.updateUserRole);

userRouter.patch('/email', userEmailValidationSchema, handleValidation, UserController.updateUserEmail);

// DELETE Method
userRouter.delete('/', deleteUserValidationSchema, handleValidation, UserController.deleteUser);

export default userRouter;