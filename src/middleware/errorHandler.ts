import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError, ValidationError } from "../lib/errors";
import { logger } from "../lib/logger";
import { env } from "../config/env";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    if (!err.isOperational) {
      logger.error(`Critical error: ${err.message}`, { stack: err.stack });
    } else {
      logger.warn(`Operational error: ${err.message}`, { statusCode: err.statusCode });
    }

    const response: any = {
      status: "error",
      message: err.message,
    };

    if (err instanceof ValidationError) {
      response.errors = err.errors;
    }

    return res.status(err.statusCode).json(response);
  }

  // Unexpected errors
  logger.error(`Unexpected error: ${err.message}`, { stack: err.stack });

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
};
