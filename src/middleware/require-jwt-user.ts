import { ErrorCode, RoutesOld } from "../schema";
import { buildErrorResponse, sendResponseOld } from "../utils";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const requireJwtUser: RequestHandler = (req, res, next) => {
  if (req.jwtUser) next();
  else
    sendResponseOld<RoutesOld["*"]["UNAUTHORIZED"]>(
      res,
      StatusCodes.UNAUTHORIZED,
      buildErrorResponse(ErrorCode.Unauthorized)
    );
};
