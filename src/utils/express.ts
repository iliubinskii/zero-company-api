import type {
  ErrorCode,
  ErrorResponse,
  ErrorResponseWithData,
  SchemaItem,
  SchemaResponse
} from "../schema";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { assertNumber } from "./assertions";
import { lang } from "../langs";
import type zod from "zod";

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
export function buildErrorResponse<E extends ErrorCode>(
  error: E,
  data: zod.ZodError
): ErrorResponseWithData<E>;

/**
 * Builds an error response object.
 * @param error - The error code.
 * @param data - Additional data to include in the response.
 * @returns The error response object.
 */
export function buildErrorResponse<E extends ErrorCode>(
  error: E,
  data?: zod.ZodError
): object {
  if (data) {
    const result: ErrorResponseWithData<E> = {
      data: data.errors.map(issue => {
        return {
          message: issue.message,
          path: issue.path
            .map((item, index) => {
              switch (typeof item) {
                case "string": {
                  return index ? `.${item}` : item;
                }

                case "number": {
                  return `[${item}]`;
                }

                default: {
                  return "";
                }
              }
            })
            .join("")
        };
      }),
      error,
      errorMessage: lang[error]
    };

    return result;
  }

  const result: ErrorResponse<E> = {
    error,
    errorMessage: lang[error]
  };

  return result;
}

/**
 * Sends a response.
 * @param res - The express response object.
 * @param status - The status code.
 * @param json - The JSON response.
 */
export function sendResponse<T extends SchemaItem = never>(
  res: Response,
  status: keyof T["responses"],
  json: SchemaResponse<T>
): void {
  res.status(assertNumber(status)).json(json);
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
