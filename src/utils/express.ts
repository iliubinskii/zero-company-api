import { NextFunction, Request, RequestHandler, Response } from "express";
import { ErrorCode } from "../schema";
import { StatusCodes } from "http-status-codes";
import { filterUndefinedProperties } from "./objects";
import { lang } from "../langs";

/**
 * Builds an error response object.
 * @param error - The error code.
 * @returns The error response object.
 */
export function buildErrorResponse<E extends ErrorCode>(
  error: E
): ErrorResponse<E>;

/**
 * Builds an error response object.
 * @param error - The error code.
 * @param data - Additional data to include in the response.
 * @returns The error response object.
 */
export function buildErrorResponse<E extends ErrorCode, D>(
  error: E,
  data: D
): ErrorResponseWithData<E, D>;

/**
 * Builds an error response object.
 * @param error - The error code.
 * @param data - Additional data to include in the response.
 * @returns The error response object.
 */
export function buildErrorResponse(error: ErrorCode, data?: unknown): object {
  return filterUndefinedProperties({
    data,
    error,
    errorMessage: lang[error]
  });
}

/**
 * Sends a response.
 * @param res - The express response object.
 * @param status - The status code.
 * @param json - The JSON response.
 */
export function sendResponse<T extends [StatusCodes, unknown]>(
  res: Response,
  status: T[0],
  json: T[1]
): void {
  res.status(status).json(json);
}

/**
 * Wraps an async request handler to catch any errors and pass them to the next middleware.
 * @param handler - The async request handler to wrap.
 * @returns The wrapped request handler.
 */
export function wrapAsyncHandler(handler: AsyncRequestHandler): RequestHandler {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises -- Ok
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

export interface AsyncRequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface ErrorResponse<E extends ErrorCode> {
  readonly error: E;
  readonly errorMessage: string;
}

export interface ErrorResponseWithData<E extends ErrorCode, D> {
  readonly data: D;
  readonly error: E;
  readonly errorMessage: string;
}
