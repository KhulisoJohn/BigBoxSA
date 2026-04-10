import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError";
import logger from "../utils/logger";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((err) => {
        // safer access for different express-validator versions
        const field = (err as any).param || (err as any).path || "field";
        return `${field}: ${err.msg}`;
      })
      .join(", ");

    logger.warn(`Validation failed: ${errorMessages}`);

    next(new ApiError(400, `Validation Error: ${errorMessages}`));
    return;
  }

  next();
};