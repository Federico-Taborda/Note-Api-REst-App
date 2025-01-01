import express from "express";
import cors from 'cors';

// Initialize express
const app = express();

// Enable CORS
const corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;