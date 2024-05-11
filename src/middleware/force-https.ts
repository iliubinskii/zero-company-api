import { ErrorCode, RoutesOld } from "../schema";
import { buildErrorResponse, sendResponseOld } from "../utils";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Middleware to apply SSL redirection and HSTS header
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware
 */
export const forceHttps: RequestHandler = (req, res, next) => {
  // Check x-forwarded-proto header in case the app is behind a proxy
  if (req.protocol === "https" || req.headers["x-forwarded-proto"] === "https")
    next();
  else
    sendResponseOld<RoutesOld["*"]["UNSECURED_URL"]>(
      res,
      StatusCodes.METHOD_NOT_ALLOWED,
      buildErrorResponse(ErrorCode.MethodNotAllowed)
    );
};
