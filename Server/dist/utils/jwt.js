"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("./ApiError");
const signToken = (payload) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw new ApiError_1.ApiError(500, 'JWT_SECRET_KEY is not defined in environment variables');
    }
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
};
exports.signToken = signToken;
const verifyToken = (token) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw new ApiError_1.ApiError(500, 'JWT_SECRET_KEY is not defined in environment variables');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded;
    }
    catch (error) {
        throw new ApiError_1.ApiError(401, 'Token verification failed: ' + (error instanceof Error ? error.message : String(error)));
    }
};
exports.verifyToken = verifyToken;
