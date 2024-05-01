import { ErrorCode } from "../schema";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { buildErrorResponse } from "../utils";

/**
 * Middleware that checks if the provided field is a valid MongoDB ObjectId.
 * @param paramName - The name of the parameter to check.
 * @returns The middleware function.
 */
export function requireValidMongodbId(paramName: string): RequestHandler {
  return (req, res, next) => {
    // eslint-disable-next-line security/detect-object-injection -- Ok
    const id = req.params[paramName];

    if (typeof id === "string" && /^[\da-f]{24}$/i.test(id)) next();
    else
      res
        .status(StatusCodes.BAD_REQUEST)
        .send(buildErrorResponse(ErrorCode.InvalidParam));
  };
}
