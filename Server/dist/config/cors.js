"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://bigboxsa.com',
    'https://www.bigboxsa.com'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true); // Allow non-browser requests (e.g., Postman)
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
};
exports.default = (0, cors_1.default)(corsOptions);
