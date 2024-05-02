import { ErrorCode, Routes } from "../schema";
import { buildErrorResponse, sendResponse } from "../utils";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const requireJwtAdmin: RequestHandler = (req, res, next) => {
  if (req.jwtUser && req.jwtUser.admin) next();
  else
    sendResponse<Routes["*"]["UNAUTHORIZED"]>(
      res,
      StatusCodes.UNAUTHORIZED,
      buildErrorResponse(ErrorCode.Unauthorized)
    );
};
