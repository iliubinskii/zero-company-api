import { buildErrorResponse, sendResponse } from "../utils";
import { ErrorCode } from "../schema";
import type { RequestHandler } from "express";
import type { Routes } from "../schema";
import { StatusCodes } from "http-status-codes";

export const requireJwt: RequestHandler = (req, res, next) => {
  if (req.jwt) next();
  else
    sendResponse<Routes["/401"]["get"]>(
      res,
      StatusCodes.UNAUTHORIZED,
      buildErrorResponse(ErrorCode.Unauthorized)
    );
};
