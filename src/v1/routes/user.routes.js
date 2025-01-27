import { Router } from 'express'
import UserController from '../../controllers/user.controllers.js'

import verifyToken from '../../middlewares/authentication/verifyToken.js'
import verifyRole from '../../middlewares/verifyRole.js'

// Validations
import {
  createUserValidationSchema,
  updateUserRoleValidationSchema,
  updateUserEmailValidationSchema,
  deleteUserValidationSchema,
  loginUserValidationSchema
} from '../../middlewares/userValidation.js'

import handleValidation from '../../middlewares/validationHandler.js'

const userRouter = Router()

// GET Method
userRouter.get('/', verifyToken, UserController.getAllUsers)

userRouter.get('/id/:userId', verifyToken, UserController.getUserById)

userRouter.get('/name/:userName', verifyToken, UserController.getUserByName)

userRouter.get('/email/:email', verifyToken, UserController.getUserByEmail)

userRouter.get('/role/:role', verifyToken, UserController.getUsersByRole)

// POST Method
userRouter.post('/login', loginUserValidationSchema, handleValidation, UserController.loginUser)

userRouter.post('/', createUserValidationSchema, handleValidation, UserController.createUser)

// PATCH Method
userRouter.patch('/role', updateUserRoleValidationSchema, handleValidation, UserController.updateUserRole)

userRouter.patch('/email', updateUserEmailValidationSchema, handleValidation, UserController.updateUserEmail)

// DELETE Method
userRouter.delete('/', deleteUserValidationSchema, handleValidation, verifyRole, UserController.deleteUser)

export default userRouter
