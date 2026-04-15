import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });

    console.log("✅ MongoDB connected");
  } catch (error: any) {
    console.error("❌ MongoDB error:", error.message);
    process.exit(1);
  }
};

export default connectDatabase;