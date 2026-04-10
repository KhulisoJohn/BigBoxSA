import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDatabase from './config/database';
import cors from './config/cors';
import { errorHandler, notFound } from './middleware/errorHandler';
import logger from './utils/logger';

// import routes here

const app = express();
const PORT = process.env.PORT || 5000;

// security & parsing
app.use(helmet());
app.use(cors); // ✅ FIXED: must call it
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP request logger
app.use(
  morgan('dev', {
    stream: {
      write: (msg: string) => logger.http(msg.trim()), // ✅ typed properly
    },
  })
);

// health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// routes go here
// app.use('/api', routes);

// handle unknown routes
app.use(notFound); // ✅ important before errorHandler

// global error handler
app.use(errorHandler);

// connect to database and start server
const startServer = async () => {

    console.log("Starting server...");

  try {
    await connectDatabase();

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1); // ✅ fail fast if DB fails
  }
};

startServer();