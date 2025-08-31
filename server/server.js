// server/server.js

import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import resumeRoutes from './src/routes/resume.routes.js';
import feedbackRoutes from './src/routes/feedback.routes.js';
import { errorHandler } from './src/middleware/error.middleware.js';

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/feedback', feedbackRoutes);

// Error Handler Middleware (must be the last one)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));