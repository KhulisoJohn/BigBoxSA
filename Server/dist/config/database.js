"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose_1.default.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            family: 4,
        });
        console.log("✅ MongoDB connected");
    }
    catch (error) {
        console.error("❌ MongoDB error:", error.message);
        process.exit(1);
    }
};
exports.default = connectDatabase;
