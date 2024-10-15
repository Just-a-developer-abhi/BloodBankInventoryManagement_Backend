import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import authRoutes from './routes/authRoutes';
import connectDB from './config/db';
import dotenv from 'dotenv';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err.statusCode || 500;
	const errorMessage = err.message || "something went wrong!";
	const errorData = err.data || "something went wrong!";
	res.status(statusCode).json({ message: errorMessage, data: errorData });
});

dotenv.config();

const PORT = process.env.PORT || 6000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
