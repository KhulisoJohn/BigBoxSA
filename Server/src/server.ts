import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDatabase from './config/database';
import cors from './config/cors';
import {errorHandler, notFound } from './middleware/errorHandler';
import logger from './utils/logger';
import e from 'express';


//import routes


const app = express();
const PORT = process.env.PORT || 5000;

//security & parsing
app.use(helmet());
app.use(cors);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

//HTTP request logger
app.use(morgan('dev', { stream: {write : (msg) => logger.http(msg.trim())}}));

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});


// Routes


// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect to database and start server
const startServer = async () => {
    await connectDatabase();
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
        logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });};

startServer();