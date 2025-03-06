import express, { Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const PORT = process.env.DEV_PORT

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});