import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/apiError";
import logger from "../utils/logger";


export const validate = (
    req: Request,
    res: Response,
    next: NextFunction
) : void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => `${err.param}: ${err.msg}`).join(', ');
        logger.warn(`Validation failed: ${errorMessages}`);
        return next(new ApiError(400, `Validation Error: ${errorMessages}`));
    }

    next();
};  
