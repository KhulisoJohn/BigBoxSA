"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const logger_1 = __importDefault(require("../utils/logger"));
const ApiError_1 = require("../utils/ApiError");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logger_1.default.warn('No token provided in Authorization header');
        return next(new ApiError_1.ApiError(401, 'Unauthorized: No token provided'));
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        logger_1.default.warn(`Invalid token: ${error instanceof Error ? error.message : String(error)}`);
        return next(new ApiError_1.ApiError(401, 'Unauthorized: Invalid token'));
    }
};
exports.authenticate = authenticate;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            logger_1.default.warn('User not authenticated');
            return next(new ApiError_1.ApiError(401, 'Unauthorized: User not authenticated'));
        }
        if (!roles.includes(req.user.role)) {
            logger_1.default.warn(`User role ${req.user.role} is not authorized to access this resource`);
            return next(new ApiError_1.ApiError(403, 'Forbidden: User does not have the required role'));
        }
        next();
    };
};
exports.authorize = authorize;
