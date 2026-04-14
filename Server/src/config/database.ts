import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDatabase = async () : Promise<void> => {
    const dbUri = process.env.MONGO_URI;

    if (!dbUri) {
        logger.error('MONGO_URI is not defined in environment variables');
        throw new Error('MONGO_URI is not defined');
        process.exit(1);
    }

    console.log("DB URI:", dbUri);
console.log("Connecting to MongoDB...");


    try {
        const connection = await mongoose.connect(dbUri, {
            serverSelectionTimeoutMS: 15000, // 5 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds socket timeout
        });
        console.log("Parsed URI:", JSON.stringify(process.env.MONGO_URI));

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