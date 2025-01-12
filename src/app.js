import express from "express";
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

// Import routes
import userRouter from './v1/routes/user.routes.js';
import noteRouter from './v1/routes/note.routes.js';

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

// Disable X-Powered-By
app.disable('x-powered-by');

// Rate-limit
app.use(limiter)

// Timeout
app.use((req, res, next) => {
    req.setTimeout(5000); // Set request timeout to 5 seconds
    res.setTimeout(5000); // Set response timeout to 5 seconds
    res.send({ message: 'Timeout' });
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

// Routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/note', noteRouter);

export default app;