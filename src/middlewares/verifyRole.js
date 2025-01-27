import UserService from '../services/user.services.js'
import { NotFoundError, UnauthorizedError } from '../utils/errors.js'

const verifyRole = async (req, res, next) => {
  const { requestUser, deleteUser } = req.body

  try {
    const user = await UserService.getUserByName(requestUser)

    if (!user) throw new NotFoundError('Admin not found', `The admin with name ${requestUser} dosn't exists`)
    if (user.role !== 'admin') throw new UnauthorizedError('Unauthorized", "You are not authorized to perform this operation')
    if (user.username === deleteUser) throw new UnauthorizedError('Unauthorized', 'You are not authorized to perform this operation')

    next()
  } catch (error) {
    return res.status(error.statusCode).send(error.response)
  }
}

export default verifyRole
