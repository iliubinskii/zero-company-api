import { ErrorCode, Routes } from "../schema";
import { buildErrorResponse, sendResponse } from "../utils";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const requireJwtUser: RequestHandler = (req, res, next) => {
  if (req.jwtUser) next();
  else
    sendResponse<Routes["*"]["UNAUTHORIZED"]>(
      res,
      StatusCodes.UNAUTHORIZED,
      buildErrorResponse(ErrorCode.Unauthorized)
    );
};
