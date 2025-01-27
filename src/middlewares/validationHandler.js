import { validationResult } from 'express-validator'
import { ValidationError } from '../utils/errors.js'

const handleValidation = (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) throw new ValidationError('Invalid parameters', errors.array())
    return next()
  } catch (error) {
    return res.status(error.statusCode).send(error.response)
  }
}

export default handleValidation
