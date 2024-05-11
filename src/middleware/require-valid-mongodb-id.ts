import { ErrorCode, RoutesOld } from "../schema";
import { buildErrorResponse, sendResponseOld } from "../utils";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Middleware that checks if the provided field is a valid MongoDB ObjectId.
 * @param paramName - The name of the parameter to check.
 * @returns The middleware function.
 */
export function requireValidMongodbId(paramName: string): RequestHandler {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (typeof id === "string" && /^[\da-f]{24}$/i.test(id)) next();
    else
      sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidParam"]>(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(ErrorCode.InvalidParam)
      );
  };
}
