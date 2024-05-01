import { NextFunction, Request, RequestHandler, Response } from "express";
import { ErrorCode } from "../schema";
import { filterUndefinedProperties } from "./objects";
import { lang } from "../langs";

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
    // eslint-disable-next-line security/detect-object-injection -- Ok
    errorMessage: lang[error]
  });
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
