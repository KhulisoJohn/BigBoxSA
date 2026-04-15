"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const ApiError_1 = require("../utils/ApiError");
const logger_1 = __importDefault(require("../utils/logger"));
/**
 * 404 Not Found Handler
 */
const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
        timestamp: new Date().toISOString(),
    });
};
exports.notFound = notFound;
/**
 * Global Error Handler
 */
const errorHandler = (err, req, res, next) => {
    logger_1.default.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
    const statusCode = err instanceof ApiError_1.ApiError ? err.statusCode : 500;
    const message = err instanceof ApiError_1.ApiError ? err.message : "Internal Server Error";
    if (statusCode >= 500) {
        logger_1.default.error(`Stack Trace: ${err instanceof Error ? err.stack : "No stack trace available"}`);
    }
    else {
        logger_1.default.warn(`Handled error: ${message}`);
    }
    res.status(statusCode).json({
        success: false,
        message,
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === "development" && err instanceof Error
            ? { stack: err.stack }
            : {}),
    });
};
exports.errorHandler = errorHandler;
