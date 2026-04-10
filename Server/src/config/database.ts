import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDatabase = async () : Promise<void> => {
    const dbUri = process.env.MONGODB_URI;

    if (!dbUri) {
        logger.error('MONGODB_URI is not defined in environment variables');
        throw new Error('MONGODB_URI is not defined');
        process.exit(1);
    }

    try {
        const connection = await mongoose.connect(dbUri, {
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds socket timeout
        });

        logger.info(`Connected to MongoDB: ${connection.connection.host}`);
    } catch (error) {
        logger.error(`Failed to connect to MongoDB: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
        process.exit(1);

    }

    mongoose.connection.on('error', (err) => {
        logger.error(`MongoDB connection error: ${err instanceof Error ? err.message : String(err)}`);
    });

    mongoose.connection.on('reconnected', () => {
        logger.info('MongoDB connection re-established.');
    });
};

export default connectDatabase;