import express from 'express'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'

// Import routes
import userRouter from './v1/routes/user.routes.js'
import noteRouter from './v1/routes/note.routes.js'

import errorHandler from './middlewares/errorHandler.js'
import { corsConfig, limiterConfig } from './config/appConfig.js'
import limitPayloadSize from './middlewares/limitPayload.js'

// Import Authentication Method
// import basicAuthentication from "./middlewares/authentication/basicAuthentication.js"

// Initialize express
const app = express()

// Settings
app.use(cors(corsConfig))
app.use(helmet())
app.use(limitPayloadSize)
app.use(rateLimit(limiterConfig))
app.set('appName', 'Note App')

// Timeout handler
app.use((req, res, next) => {
  req.setTimeout(5000) // Set request timeout to 5 seconds
  res.setTimeout(5000)// .send({message: 'Exceeded timeout'}); // Set response timeout to 5 seconds
  next()
})

// Parse JSON bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Authentication
// app.use(basicAuthentication);

// Routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/note', noteRouter)

// Error handler middleware
app.use(errorHandler)

export default app
