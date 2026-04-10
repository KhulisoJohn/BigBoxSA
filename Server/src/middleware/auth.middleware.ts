import { Request, Response , NextFunction } from "express";
import { verifyToken, JwtPayload } from "../utils/jwt";
import logger from "../utils/logger";
import {ApiError} from "../utils/ApiError";


declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) : void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logger.warn('No token provided in Authorization header');
        return next(new ApiError(401, 'Unauthorized: No token provided'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        logger.warn(`Invalid token: ${error instanceof Error ? error.message : String(error)}`);
        return next(new ApiError(401, 'Unauthorized: Invalid token'));
    }
};

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) : void => {
        if (!req.user) {
            logger.warn('User not authenticated');
            return next(new ApiError(401, 'Unauthorized: User not authenticated'));
        }

        if (!roles.includes(req.user.role)) {
            logger.warn(`User role ${req.user.role} is not authorized to access this resource`);
            return next(new ApiError(403, 'Forbidden: User does not have the required role'));
        }

        next();
    };
};