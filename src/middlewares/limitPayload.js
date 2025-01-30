import { AppError, PayloadSizeError } from '../utils/errors.js'

const limitPayloadSize = (req, res, next) => {
  const MAX_PAYLOAD_SIZE = 1024 * 1024 // 1MB

  try {
    if (req.headers['content-length'] && parseInt(req.headers['content-length']) > MAX_PAYLOAD_SIZE) {
      throw new PayloadSizeError('Payload size too large', 'The request payload size exceeds the maximum allowed size')
    }

    next()
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send(error.response)
    }
    console.error(error)
  }
}

export default limitPayloadSize
