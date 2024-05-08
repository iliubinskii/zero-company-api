import { ErrorCode, Routes } from "../schema";
import { buildErrorResponse, sendResponse } from "../utils";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
/**
 * Middleware to apply SSL redirection and HSTS header
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware
 */
export const forceHttps: RequestHandler = (req, res, next) => {
  if (req.protocol === "http")
    sendResponse<Routes["*"]["UNSECURED_URL"]>(
      res,
      StatusCodes.METHOD_NOT_ALLOWED,
      buildErrorResponse(ErrorCode.MethodNotAllowed)
    );
  else next();
};
