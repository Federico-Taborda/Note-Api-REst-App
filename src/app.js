import express from "express";
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

// Import routes
import userRouter from './v1/routes/user.routes.js';
import noteRouter from './v1/routes/note.routes.js';

// Import Authentication Method
//import basicAuthentication from "./middlewares/authentication/basicAuthentication.js";

// Rate-limit config
const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests'
});

// Initialize express
const app = express();

// Settings
app.set('appName', 'Note App');
app.disable('x-powered-by');

// Rate-limit
app.use(limiter)

// Timeout
app.use((req, res, next) => {
    req.setTimeout(5000); // Set request timeout to 5 seconds
    res.setTimeout(5000)//.send({message: 'Exceeded timeout'}); // Set response timeout to 5 seconds
    next();
});

// Enable CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
};
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Authentication
//app.use(basicAuthentication);

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/note', noteRouter);

// Error handler
app.use((err, req, res, next) => {
    res.status(err?.statusCode || 500).send({ message: err?.message || err });
})

export default app;