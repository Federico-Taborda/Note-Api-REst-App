import UserService from '../services/user.services.js'
import User from '../models/userModel.js'

import jwt from 'jsonwebtoken'
import config from '../config/config.js'

import { AppError, UnauthorizedError, TypeError, InvalidCredentialsError, NotFoundError } from '../utils/errors.js'

const sendResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).send({
    success: statusCode < 400,
    status: statusCode,
    message,
    data: data || ''
  })
}

class UserController {
  static async createUser (req, res) {
    try {
      const user = await UserService.getUserByName(req.body.username)

      if (user instanceof User) {
        return sendResponse(res, 400, 'User has already been created')
      }

      const newUser = await UserService.createUser(req.body)

      return sendResponse(res, 201, 'User created successfully', newUser)
    } catch (error) {
      console.log(error)
    }
  }

  static async getAllUsers (req, res) {
    try {
      const users = await UserService.getAllUsers()

      if (!Array.isArray(users) || users.length === 0) throw new NotFoundError('No users found', 'No user has been created yet')

      return sendResponse(res, 200, 'Users retrieved successfully', users)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async getUserById (req, res) {
    try {
      const id = parseInt(req.params.userId, 10)

      if (!Number.isInteger(id)) throw new TypeError('Invalid user ID', 'User ID must be a integer')

      const user = await UserService.getUserById(id)

      if (!user) throw new NotFoundError('User not found', `User with id ${id} not found`)

      return sendResponse(res, 200, 'User retrieved successfully', user)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async getUserByName (req, res) {
    try {
      const name = req.params.userName
      const user = await UserService.getUserByName(name)

      if (!user) throw new NotFoundError('User not found', `User with name ${name} not found`)

      return sendResponse(res, 200, 'User retrieved successfully', user)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async getUserByEmail (req, res) {
    try {
      const email = req.params.email
      const user = await UserService.getUserByEmail(email)

      if (!user) throw new NotFoundError('User not found', `User with email ${email} not found`)

      return sendResponse(res, 200, 'User retrieved successfully', user)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async getUsersByRole (req, res) {
    try {
      const userRole = req.params.role
      const users = await UserService.getUsersByRole(userRole)

      if (!Array.isArray(users) || users.length === 0) throw new NotFoundError('Not users found', `No users found with the specified role ${userRole}`)

      return sendResponse(res, 200, 'Users retrieved successfully', users)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async updateUserRole (req, res) {
    try {
      const { requestUser, updateUser, newRole } = req.body
      const admin = await UserService.getUserByName(requestUser)

      if (!admin) throw new NotFoundError('User not found', `User with name ${requestUser} not found`)

      if (admin.role !== 'admin') throw new UnauthorizedError('Unauthorized', 'You are not authorized to perform this operation')

      const user = await UserService.getUserByName(updateUser)

      if (!user) throw new NotFoundError('User not found', `User with name ${updateUser} not found`)

      if (user.role === newRole) {
        return sendResponse(res, 200, 'User role has already been updated successfully', user)
      };

      await UserService.updateUserRole(user.id, newRole)
      user.role = newRole

      return sendResponse(res, 200, 'User role updated successfully', user)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async updateUserEmail (req, res) {
    try {
      const { userName, email } = req.body
      const user = await UserService.getUserByName(userName)

      if (!user) throw new NotFoundError('User not found', `User with name: ${userName} dosn't exists`)

      if (user.email === email) {
        return sendResponse(res, 200, 'User email has already been updated successfully', user)
      }

      await UserService.updateUserEmail(user.id, email)
      user.email = email

      return sendResponse(res, 200, 'User email updated successfully', user)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async deleteUser (req, res) {
    try {
      const { deleteUser } = req.body

      const user = await UserService.getUserByName(deleteUser)

      if (!user) throw new NotFoundError('User not found', `User with name ${deleteUser} dosn't exists`)

      await UserService.deleteUser(user.id)

      return sendResponse(res, 200, `User ${user.username} deleted successfully`)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async loginUser (req, res) {
    try {
      const secretKey = config.secret_key
      const username = req.body.username
      const email = req.body.email

      const user = await UserService.verifyCredentials(username, email)

      if (!user) throw new InvalidCredentialsError('Credentials are invalid', 'Invalid username or email')

      const matchEmail = user.email === email

      if (!matchEmail) throw new UnauthorizedError('Credentials are invalid', 'Invalid username or email')

      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' })
      return sendResponse(res, 200, 'User logged in successfully', { token })
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
      return res.status(401).send({ message: 'Authentication failed' })
    }
  }
}

export default UserController
