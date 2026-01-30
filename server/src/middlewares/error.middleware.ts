import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api_error";
import { ENV } from "../config/env";

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: unknown = null;

  // Check if it's an ApiError instance
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors || null;
  }

  // Mongoose ValidationError
  else if (err instanceof Error && err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    errors = (err as any).errors;
  }

  // Mongoose duplicate key error
  else if (err instanceof Error && (err as any).code === 11000) {
    statusCode = 409;
    message = "Duplicate key error";
    errors = (err as any).keyValue;
  }

  // Unknown error
  else if (err instanceof Error) {
    message = err.message;
  }

  console.error("Error Occurred:", err);

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
    stack: ENV.NODE_ENV === "dev" ? err instanceof Error ? err.stack : undefined : undefined,
  });
};
