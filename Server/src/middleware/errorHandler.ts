import { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from "express";
import { ApiError } from "../utils/ApiError";
import logger from "../utils/logger";

/**
 * 404 Not Found Handler
 */
export const notFound: RequestHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Global Error Handler
 */
export const errorHandler: ErrorRequestHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(`Error: ${err instanceof Error ? err.message : String(err)}`);

  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message =
    err instanceof ApiError ? err.message : "Internal Server Error";

  if (statusCode >= 500) {
    logger.error(
      `Stack Trace: ${
        err instanceof Error ? err.stack : "No stack trace available"
      }`
    );
  } else {
    logger.warn(`Handled error: ${message}`);
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