import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError";


export interface JwtPayload {
    userId: string;
    role: string;
    iat: number;
    exp: number;
}


export const signToken = (payload : JwtPayload ): string => {
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
        throw new ApiError(500, 'JWT_SECRET_KEY is not defined in environment variables');
    }

    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};


export const verifyToken = (token: string): JwtPayload => {
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
        throw new ApiError(500, 'JWT_SECRET_KEY is not defined in environment variables');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded as JwtPayload;
    } catch (error) {
        throw new ApiError(401, 'Token verification failed: ' + (error instanceof Error ? error.message : String(error)));
    }
};