import express from "express";
import cors from 'cors';

// Imoport routes
import userRouter from './v1/routes/user.routes.js';
import noteRouter from './v1/routes/note.routes.js';

// Initialize express
const app = express();

// Enable CORS
const corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Routers
app.use('/api/v1/user', userRouter);

app.use('/api/v1/note', noteRouter);

export default app;